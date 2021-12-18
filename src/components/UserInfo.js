export default class UserInfo {
  constructor({ nameUser, aboutUser }) {
      this._nameUser = nameUser;
      this._aboutUser = aboutUser;
  }

  getUserInfo() {
      return {
          name: this._nameUser.textContent,
          about: this._aboutUser.textContent
      }
  }

  setUserInfo(data) {
      this._nameUser.textContent = data.name;
      this._aboutUser.textContent = data.about;
  }
}


