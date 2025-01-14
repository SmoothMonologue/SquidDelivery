import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import authService from '../services/auth.service.js';

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  userSignUp = async (req, res) => {
    const { email, password, name, interest, phoneNumber } = req.body;
    await this.#service.createUser({ email, password, name, interest, phoneNumber });
    res.status(HTTP_STATUS.CREATED).json(MESSAGES.AUTH.SIGN_UP.SUCCEED);
  };

  partnerSignUp = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;
    await this.#service.createPartner({ email, password, name, phoneNumber });
    res.status(HTTP_STATUS.CREATED).json(MESSAGES.AUTH.SIGN_UP.SUCCEED);
  };

  signIn = async (req, res) => {
    const { email, password, catchBox } = req.body;

    if (catchBox) {
      const partner = await this.#service.signInPartner({ email, password });
      // console.log(partner)
      const { accessToken } = partner.data;
      if (accessToken) {
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        console.log('사장님 로그인 성공!');
      }
      res.status(HTTP_STATUS.OK).json(partner.data);
    } else {
      const user = await this.#service.signInUser({ email, password });
      // console.log(user);
      const { accessToken } = user.data;
      if (accessToken) {
        res.setHeader('authorization', `Bearer ${accessToken}`);
        console.log('사용자 로그인 성공!');
      }
      res.status(HTTP_STATUS.CREATED).json(user.data);
    }
  };

  signOut = async (req, res) => {
    const { authorization } = req.headers;
    const user = await this.#service.signOutUser({ authorization });
    res.status(HTTP_STATUS.CREATED).json();
  };
}

export default new AuthController(authService);
