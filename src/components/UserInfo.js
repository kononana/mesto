export default class UserInfo {
    constructor({ name, info }) {
        this._name = name
        this._info = info
    }
    getUserInfo() {
        return ({ name: this._name.textContent, info: this._info.textContent });
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._info.textContent = data.info
    }
}