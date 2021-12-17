export default class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
    }})
    .then(this._checkResponseStatus);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
    }})
    .then(this._checkResponseStatus);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({name, about})
    })
    .then(this._checkResponseStatus);
  }

  setAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponseStatus);
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({name, link})
    })
    .then(this._checkResponseStatus);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }
}