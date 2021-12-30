export default class UserInfo {
    constructor ({userSelector, infoSelector, avatarSelector}) { 
      this._userName = userSelector;
      this._userInfo = infoSelector;
      this._userAvatar = avatarSelector;
    }
  

    getUserInfo() {
      return { 
        name: this._userName.textContent,
        about: this._userInfo.textContent,
        avatar: this._userAvatar.src
      }
    }
  
    setUserInfo(data) {
      this._userName.textContent = data.name;
      this._userInfo.textContent = data.about;
    }

    // Установка аватарки
  
    setAvatar(data) {
      this._userAvatar.src = data.avatar;
    }
    
  }