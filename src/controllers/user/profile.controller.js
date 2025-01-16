// import profileService from '../../services/user/profile.service.js';

export default class ProfileController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  getProfile = async (req, res) => {
    const id = req.user.id;
    return await this.#service.getProfile(id);
  };

  setProfile = async (req, res) => {
    const id = req.user.id;
    const { profileData } = req.body;
    return await this.#service.setProfile({ id, profileData });
  };

  resign = async (req, res) => {
    const id = req.user.id;
    return await this.#service.resign(id);
  };
}

// export default new profileController(profileService);
