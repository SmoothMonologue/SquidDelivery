// import profileService from '../../services/user/profile.service.js';

import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

export default class ProfileController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getProfile = async (req, res) => {
    try {
      const id = req.user.id;
      const myProfile = await this.#service.getProfile(id);

      //본인 맞는지 확인
      if (!myProfile) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.USERS.COMMON.NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: myProfile,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USERS.READ_ME.FAILED,
      });
    }
  };

  setProfile = async (req, res) => {
    try {
      const id = req.user.id;
      const profileData = req.body;
      await this.#service.setProfile({ id, profileData });

      //검증
      //   if (!myProfile) {
      //     return res.status(HTTP_STATUS.NOT_FOUND).json({
      //       message: MESSAGES.USERS.COMMON.NOT_FOUND,
      //     });
      //   }

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.USERS.UPDATE.SUCCEED,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USERS.UPDATE.FAILED,
      });
    }
  };

  resign = async (req, res) => {
    try {
      const id = req.user.id;
      const myProfile = await this.#service.getProfile(id);
      //본인 맞는지 확인
      if (!myProfile) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MESSAGES.USERS.COMMON.NOT_FOUND,
        });
      }

      await this.#service.resign(id);
      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.USERS.RESIGN.SUCCEED,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USERS.RESIGN.FAILED,
      });
    }
  };
}

// export default new profileController(profileService);
