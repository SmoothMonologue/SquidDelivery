import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HASH_SALT_ROUNDS, ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { CustomError } from '../middlewares/error-handler.middleware.js';

export class AuthService {
  #userRepository;
  #partnerRepository;

  constructor(userRepository, partnerRepository) {
    this.#userRepository = userRepository;
    this.#partnerRepository = partnerRepository;
  }

  createUser = async ({ email, password, name, interest, phoneNumber }) => {
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    return this.#userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      interest,
      phoneNumber,
    });
  };

  createPartner = async ({ email, password, name, phoneNumber }) => {
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    return this.#partnerRepository.createPartner({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
  };

  signInPartner = async (partnerData) => {
    const partner = await this.#partnerRepository.signInPartner({ email: partnerData.email });
    if (!partner) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    const isPasswordMatched = bcrypt.compareSync(partnerData.password, partner.password);
    if (!isPasswordMatched) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.SIGN_IN.NO_MACHTED);
    }

    const payload = { id: partner.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    return { data: { accessToken } };
  };

  signInUser = async (userData) => {
    const user = await this.#userRepository.signInUser({ email: userData.email });
    if (!user) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.SIGN_IN.NOT_FOUND);
    }

    const isPasswordMatched = bcrypt.compareSync(userData.password, user.password);

    if (!isPasswordMatched) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    return { data: { accessToken } };
  };

  signOut = async (authorization) => {
    if (!authorization.authorization) {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }
    const [tokenType, token] = authorization.authorization.split(' ');

    if (!token || tokenType !== 'Bearer') {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.INVALID);
    }
    try {
      jwt.verify(token, ACCESS_TOKEN_SECRET);
      return {
          status: HTTP_STATUS.OK,
          message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        };
      } catch (error) {
        return {
          status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.JWT.INVALID,
      };
    }
  };
}

