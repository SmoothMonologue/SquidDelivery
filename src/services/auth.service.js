import userRepository from '../repositories/user/user.repository.js';
import partnerRepository from '../repositories/partner/partner.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HASH_SALT_ROUNDS, ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class AuthService {
  #userRepository;
  #partnerRepository;

  constructor(userRepository, partnerRepository) {
    this.#userRepository = userRepository;
    this.#partnerRepository = partnerRepository;
  }

  createUser = async ({ email, password, name, interest }) => {
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    return this.#userRepository.createUser({ name, email, password: hashedPassword, interest });
  };

  createPartner = async ({ email, password, name }) => {
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    return this.#partnerRepository.createPartner({ name, email, password: hashedPassword });
  };

  signInPartner = async (partnerData) => {
    const partner = await this.#partnerRepository.signInPartner({ email: partnerData.email });
    if (!partner) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }
    console.log('partner= ', partner);
    console.log('partner.password= ', partner.password);
    const isPasswordMatched = bcrypt.compareSync(partnerData.password, partner.password);
    if (!isPasswordMatched) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    const payload = { id: partner.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Expose-Headers': 'Authorization',
      },
      data: { accessToken },
    };
  };

  signInUser = async (userData) => {
    const user = await this.#userRepository.signInUser({ email: userData.email });
    const isPasswordMatched = bcrypt.compareSync(userData.password, user.password);

    if (!isPasswordMatched) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Expose-Headers': 'Authorization',
      },
      data: { accessToken },
    };
  };

  signOut = async (authorization) => {
    if (!authorization) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
      };
    }

    const [tokenType, token] = authorization.split(' ');
    if (!token || tokenType !== 'Bearer') {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.JWT.INVALID,
      };
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.COMMON.SIGN_OUT.SUCCEED,
    };
  };
}

export default new AuthService(userRepository, partnerRepository);
