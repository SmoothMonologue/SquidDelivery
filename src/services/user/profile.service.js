// import profileRepository from '../../repositories/user/profile.repository.js';

export default class ProfileService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getProfile = async (id) => {
    return await this.#repository.getProfile(id);
  };

  setProfile = async (profileData) => {
    return await this.#repository.setProfile(profileData);
  };

  resign = async (id) => {
    return await this.#repository.resign(id);
  };
}

// export default new profileService(profileRepository);
