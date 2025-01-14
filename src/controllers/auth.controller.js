import { HTTP_STATUS } from '../constants/http-status.constant.js';
import authService from '../services/auth.service.js';

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  userSignUp = async (req, res) => {
    const { email, password, name, interest } = req.body;
    const user = await this.#service.createUser({ email, password, name, interest });
    res.status(HTTP_STATUS.CREATED).json(user);
  };

  partnerSignUp = async (req, res) => {
    const { email, password, name } = req.body;
    const partner = await this.#service.createPartner({ email, password, name });
    res.status(HTTP_STATUS.CREATED).json(partner);
  };

  signIn = async (req, res) => {
    const { email, password, catchBox } = req.body;

    if (catchBox) {
      const partner = await this.#service.signInPartner({ email, password });
      const { accessToken } = partner.data;
      if (accessToken) {
        res.setHeader('Authorization', `Bearer ${accessToken}`);
      }
      res.status(HTTP_STATUS.OK).json(partner.data);
    } else {
      const user = await this.#service.signInUser({ email, password });
      const { accessToken } = user.data;
      if (accessToken) {
        res.setHeader('Authorization', `Bearer ${accessToken}`);
      }
      res.status(HTTP_STATUS.OK).json(user.data);
    }
  };

  signOut = async (req, res) => {
    const { authorization } = req.headers;
    const user = await this.#service.signOutUser({ authorization });
    res.status(HTTP_STATUS.CREATED).json();
  };
}

export default new AuthController(authService);
