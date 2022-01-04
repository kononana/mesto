export default class Api {
  constructor({url, headers}) {
      this._url = url;
      this._headers = headers
  }

  // Check response
  _checkResponse(res) {
    if (res.ok) {  
      return res.json(); 
    } return Promise.reject(`Что-то пошло не так: ${res} `) 
  }

  //receive data about current user

getUserInfo() { 
      return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
 
  }

//receive card-list from server
getInitialCards() {
      return fetch(`${this._url}cards`, {
          headers: this._headers
      })
      .then(this._checkResponse)
 
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
  .then(this._checkResponse)
 
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
      .then(this._checkResponse)
 
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
    .then(this._checkResponse)
 
}


// Delete a card
deleteCard(cardId) {
  return fetch(`${this._url}cards/${cardId}`, { 
    method: "DELETE", 
    headers: this._headers,
  })
  .then(this._checkResponse)
 
}

//Like chosen card 
addLike(cardId) {
  return fetch(`${this._url}cards/likes/${cardId}`, { 
    method: "PUT", 
    headers: this._headers,
  })
  .then(this._checkResponse)
 
}

//Delete like from a card
deleteLike(cardId) {
  return fetch(`${this._url}cards/likes/${cardId}`, { 
    method: "DELETE", 
    headers: this._headers,
  })
  .then(this._checkResponse)
 
}

}