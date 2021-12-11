export default class UserInfo {
    constructor({ name, info }) {
        this._name = name
        this._info = info
    }
    getUserInfo() {
        return ({ name: this._name.textContent, info: this._info.textContent });
    }
    setUserInfo(nameInput, jobInput) {
        nameInput.value = this._name.textContent
        jobInput.value = this._info.textContent
    }
}