export class Card {
  constructor(options) {
    this._data = options.data;
    this._id = options.data._id;
    this._userId = options.userId;
    this._ownerId = options.data.owner._id;
    this._name = options.data.name;
    this._link = options.data.link;
    this._addLike = options.addLike;
    this._removeLike = options.removeLike;
    this._openPopup = options.openPopup;
    this._removeCard = options.removeCard;
    this._isLiked = false;
  }

  _checkLikes = () => {
    this._isLiked = this._data.likes.some(card => {
      if (card._id === this._userId) {
        this._сardLikeIcon.classList.add('place-card__like-icon_liked');
      }
    })

    this._сardLikeCount.textContent = this._data.likes.length;
  }

  _like = () => {
    if (!this._isLiked) {
      this._addLike(this._id).then(data => {
        this._сardLikeIcon.classList.add('place-card__like-icon_liked');
        this._сardLikeCount.textContent = data.likes.length;
        this._isLiked = true;
      })
        .catch(err => console.log(err));
    } else {
      this._removeLike(this._id).then(data => {
        this._сardLikeIcon.classList.remove('place-card__like-icon_liked');
        this._сardLikeCount.textContent = data.likes.length;
        this._isLiked = false;
      })
        .catch(err => console.log(err));
    }
  };

  _remove = (event) => {
    event.stopPropagation();

    if (window.confirm('Удалить карточку?')) {
      this._removeCard(this._id).then(() => {
        this._removeEventListener();
        this._сard.remove();
      })
        .catch(err => {
          console.log(err);
        });
    }
  };

  create = () => {
    this._сard = document.createElement('div');
    this._сardImage = document.createElement('div');
    this._сardDeleteIcon = document.createElement('button');
    this._сardDescription = document.createElement('div');
    this._сardName = document.createElement('h3');
    this._сardLikesBox = document.createElement('div');
    this._сardLikeIcon = document.createElement('button');
    this._сardLikeCount = document.createElement('span');

    this._сard.classList.add('place-card');
    this._сardImage.classList.add('place-card__image');
    this._сardImage.setAttribute(
      'style',
      `background-image: url(${this._link})`
    );
    this._сardImage.setAttribute(
      'data-link',
      `${this._link}`
    );
    if (this._ownerId === this._userId) {
      this._сardDeleteIcon.classList.add('place-card__delete-icon_mine');
    };
    this._сardDeleteIcon.classList.add('place-card__delete-icon');
    this._сardDescription.classList.add('place-card__description');
    this._сardName.classList.add('place-card__name');
    this._сardName.textContent = this._name;
    this._сardLikesBox.classList.add('place-card__like-box');
    this._сardLikeIcon.classList.add('place-card__like-icon');
    this._сardLikeCount.classList.add('place-card__like-count');

    this._сardImage.appendChild(this._сardDeleteIcon);
    this._сardLikesBox.appendChild(this._сardLikeIcon);
    this._сardLikesBox.appendChild(this._сardLikeCount);
    this._сardDescription.appendChild(this._сardName);
    this._сardDescription.appendChild(this._сardLikesBox);
    this._сard.appendChild(this._сardImage);
    this._сard.appendChild(this._сardDescription);

    this._checkLikes();
    this._setEventListener();

    return this._сard;
  };

  _setEventListener = () => {
    this._сardLikeIcon
      .addEventListener("click", this._like);

    this._сardDeleteIcon
      .addEventListener("click", this._remove);

    this._сardImage
      .addEventListener("click", this._openPopup);
  };

  _removeEventListener = () => {

    this._сardLikeIcon
      .removeEventListener("click", this._like);

    this._сardDeleteIcon
      .removeEventListener("click", this._remove);

    this._сardImage
      .removeEventListener("click", this._openPopup);
  }
}

  // Можно лучше +
  // Воспользуйтесь <template> -- https://developer.mozilla.org/ru/docs/Web/HTML/Element/template

