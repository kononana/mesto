export default class Api {
  constructor({url, headers}) {
      this._url = url;
      this._headers = headers
  }
  //receive data about current user

getUserInfo() { 
      return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
  }

//receive card-list from server
getInitialCards() {
      return fetch(`${this._url}cards`, {
          headers: this._headers
      })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
          })
  }


//edit user profile
 editUserInfo(data) {   
  return fetch(`${this._url}users/me`, { 
    method: "PATCH", 
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then((res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

  //edit avatar
  editAvatar(data) {  
      return fetch(`${this._url}users/me/avatar`, { 
        method: "PATCH", 
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      }) 
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
          })
  }
  // Add new card to the Server
  addNewCard(data) { 
    return fetch(`${this._url}cards`, { 
      method: "POST", 
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      }) 
    })
  
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
}


// Delete a card
deleteCard(cardId) {
  return fetch(`${this._url}cards/${cardId}`, { 
    method: "DELETE", 
    headers: this._headers,
  })
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
}

//Like chosen card 
addLike(cardId) {
  return fetch(`${this._url}cards/likes/${cardId}`, { 
    method: "PUT", 
    headers: this._headers,
  })
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
}

//Delete like from a card
deleteLike(cardId) {
  return fetch(`${this._url}cards/likes/${cardId}`, { 
    method: "DELETE", 
    headers: this._headers,
  })
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
}

}