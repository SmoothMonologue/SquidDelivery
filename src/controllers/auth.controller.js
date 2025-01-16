import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  userSignUp = async (req, res, next) => {
    const { email, password, name, interest, phoneNumber } = req.body;
    const user = await this.#service.createUser({ email, password, name, interest, phoneNumber });
    if (user.status) {
      return res.status(user.status).json(user.message);
    }
    return res.status(HTTP_STATUS.CREATED).json(MESSAGES.AUTH.SIGN_UP.SUCCEED);
  };

  partnerSignUp = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;
    const partnet = await this.#service.createPartner({ email, password, name, phoneNumber });
    if (partnet.status) {
      return res.status(partnet.status).json(partnet.message);
    }
    return res.status(HTTP_STATUS.CREATED).json(MESSAGES.AUTH.SIGN_UP.SUCCEED);
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password, catchBox } = req.body;

      if (catchBox) {
        const partner = await this.#service.signInPartner({ email, password });
        const { accessToken } = partner.data;
        if (accessToken) {
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          console.log('사장님 로그인 성공!');
        }
        return res.status(HTTP_STATUS.OK).json(partner.data);
      } else {
        const user = await this.#service.signInUser({ email, password });
        const { accessToken } = user.data;
        if (accessToken) {
          res.setHeader('authorization', `Bearer ${accessToken}`);
          console.log('사용자 로그인 성공!');
        }
        return res.status(HTTP_STATUS.CREATED).json(user.data);
      }
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req, res) => {
    const { authorization } = req.headers;
    const user = await this.#service.signOut({ authorization });
    if (user.status) {
    }
    return res.status(user.status).json(user.message);
  };
}
