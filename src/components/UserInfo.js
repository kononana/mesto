export default class UserInfo {
    constructor({ name, job }) {
        this._name = name
        this._info = job
    }
    getUserInfo() {
        return { 
        name: this._name.textContent,
        job: this._info.textContent,
          
        }
      }
      
    setUserInfo(data) {
        this._name.textContent = data.name
        this._info.textContent = data.job
        
    }
    
}
