export default class UserInfo {
    constructor({ nameUser, aboutUser }) {
        this._name = nameUser;
        this._about = aboutUser;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}