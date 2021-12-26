export default class Api {
  constructor (config) { 
    this._url = config.url;
    this._headers = config.headers; 
  }

  // отдельно выносим проверку, чтоб не писать ее каждый раз
  _checkLineOk(responce) {
    if (responce.ok) {  // если у объекта responce поле ок = истина
      return responce.json(); // тогла возвращаем реальные данные (если не написать return в следующий промис не передадутся данные)
    } return Promise.reject(`Ошибка: ${res} `) // если статус не ок, возвращаем Promise.rejec (переводим в значение rejected (отклонено))
  }

  // получение данных профиля 
  getUserInfo() { // усли fetch ничего не возвращает, по умолчанию он вернет underfined
    return fetch(`${this._url}users/me`, { // первый аргумент - куда направляем запрос
      // второй аргумент - объект с настройками
      method: "GET", // поумолчанию метод всегда GET, но лучше указывать, что б было явно видно
      headers: this._headers
    })
    .then((responce) => {
      return this._checkLineOk(responce)
    }) //если сервер хоть чем-то ответил (даже статус 400), значит успешно, если сервер ничем не ответил, тогда fetch перейдет в значение rejected и мы перейдем в блок catch
  }

  // получение карточек 
  getInitialCards() { 
    return fetch(`${this._url}cards`, { 
      method: "GET",  
      headers: this._headers
    })
    .then((responce) => {
      return this._checkLineOk(responce)
    }) 
  }

  // редактирование данных профиля
  editUserInfo(data) {   //чтобы передать данные на сервер нам необходимо по нашему api передавать в боди эти данные. 
    return fetch(`${this._url}users/me`, { 
      method: "PATCH", 
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((responce) => {
      return this._checkLineOk(responce)
    }) 
  }

  // редактирование аватара 
  editAvatar(data) {  
    return fetch(`${this._url}users/me/avatar`, { 
      method: "PATCH", 
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }) 
    .then((responce) => {
      return this._checkLineOk(responce)
    }) 
  }
}