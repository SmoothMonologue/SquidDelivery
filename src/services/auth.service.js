import userRepository from '../repositories/user/user.repository.js';
import partnerRepository from '../repositories/partner/partner.repository.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';

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

  signInUser = async ({ email, password }) => {
    const user = await this.#userRepository.signInUser({ email, password });
    if (!user) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      };
    }
    return { email: user.email, password: user.password };
  };

  signInPartner = async ({ email, password }) => {
    const partner = await this.#partnerRepository.signInPartner({ email, password });
    if (!partner) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.AUTH.SIGN_IN.FAILED,
      };
    }
    return { email: partner.email, password: partner.password };
  };
}

export default new AuthService(userRepository, partnerRepository);
