export default class UserInfo {
    constructor({ name, info }) {
        this._name = name
        this._info = info
    }
    getUserInfo() {
        return ({ name: this._name.textContent, info: this._info.textContent });
    }


    setUserInfo(nameInput, jobInput) {
        this._name.textContent = nameInput.value
        this._info.textContent = jobInput.value
    }
}