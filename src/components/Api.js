export default class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
    }})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
    }})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22',
        'Content-Type': 'application/json',
      }, 
    })
    .then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}