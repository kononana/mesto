export default class UserInfo {
    constructor({ name, job, avatar }) {
        this._name = name
        this._info = job
        this._avatar = avatar
    }
    getUserInfo() {
        return { 
        name: this._name.textContent,
        job: this._info.textContent,
        avatar: this._avatar.src
          
        }
      }
      
    setUserInfo(data) {
        this._name.textContent = data.name
        this._info.textContent = data.job
        
    }

    setAvatar(data) {
        this._avatar.src = data.avatar
    }
    
}
