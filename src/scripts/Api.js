export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResolve = (mes, res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`${mes} ${res.status}`);
  }

  loadUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        return this._getResolve('Данные не удалось получить:', res);
      })
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        return this._getResolve('Данные не удалось получить:', res);
      })
  }

  editProfile = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(res => {
        return this._getResolve('Данные не удалось обновить:', res);
      })
  }

  uploadCard = (place) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place.name,
        link: place.link,
      })
    })
      .then(res => {
        return this._getResolve('Данные не удалось отправить:', res);
      })
  }

  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResolve('Данные не удалось удалить:', res);
      })
  }

  addLike = (id) => {
    return fetch(`${this._baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        return this._getResolve('Операцию не удалось совершить:', res);
      })
  }

  removeLike = (id) => {
    return fetch(`${this._baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResolve('Данные не удалось удалить:', res);
      })
  }

  setAvatar = (link) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => {
        return this._getResolve('Аватар не удалось загрузить:', res);
      })
  }
}
