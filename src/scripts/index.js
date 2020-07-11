import "../pages/index.css";
import {Api} from "./Api.js";
import {Card} from "./Card.js";
import {CardList} from "./CardList.js";
import {FormPopup} from "./FormPopup.js";
import {ImagePopup} from "./ImagePopup.js";
import {UserInfo} from "./UserInfo.js";
import {FormValidator} from "./FormValidator.js";

// IIFE
(function () {

  // nodes
  const root = document.querySelector('.root');
  const placesList = root.querySelector('.places-list');
  const contentName = root.querySelector('.user-info__name');
  const contentInfo = root.querySelector('.user-info__job');
  const popupPictureElement = root.querySelector('.popup__picture');

  // forms
  const {formAdd, formEdit, formAvatar} = document.forms;
  const inputPlace = formAdd.elements.name;
  const inputLink = formAdd.elements.link;
  const inputName = formEdit.elements.name;
  const inputAbout = formEdit.elements.description;
  const inputAvatar = formAvatar.elements.link;

  // buttons
  const addButton = root.querySelector('#addButton');
  const editButton = root.querySelector('#editButton');
  const avatarButton = root.querySelector('#avatarButton');
  const openButtonAdd = root.querySelector('#popupAddOpen');
  const openButtonEdit = root.querySelector('#popupEditOpen');
  const openButtonAvatar = root.querySelector('#popupAvatarOpen');
  const closeButtonAdd = root.querySelector('#popupAddClose');
  const closeButtonEdit = root.querySelector('#popupEditClose');
  const closeButtonImage = root.querySelector('#popupImageClose');
  const closeButtonAvatar = root.querySelector('#popupAvatarClose');

  // popups
  const popupAdd = root.querySelector('#popupAdd');
  const popupEdit = root.querySelector('#popupEdit');
  const popupImage = root.querySelector('#popupImage');
  const popupAvatar = root.querySelector('#popupAvatar');

  // options
  const userId = 'cf1e0c19ae129e06f2bf87ed';
  const popupIsOpened = 'popup_is-opened'
  const validatorSelectors = {
    _buttonSelector: '.popup__button',
    _messageSelector: '.popup__message',
    _buttonIsActive: 'popup__button_active',
  }

  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk';

  const apiData = {
    baseUrl: `${serverUrl}/cohort11`,
    headers: {
      authorization: 'c7abc7b4-7288-4697-964a-91cac94f5ba4',
      'Content-Type': 'application/json'
    }
  }

  // classes
  const api = new Api(apiData);
  const formAddValidator = new FormValidator(formAdd, validatorSelectors);
  const formEditValidator = new FormValidator(formEdit, validatorSelectors);
  const formAvatarValidator = new FormValidator(formAvatar, validatorSelectors);

  // classes
  const userInfo = new UserInfo({
    nameContent: contentName,
    aboutContent: contentInfo,
    inputName: inputName,
    inputAbout: inputAbout,
    imageAvatar: openButtonAvatar,
  });

  const addPopup = new FormPopup({
    popup: popupAdd,
    openButton: openButtonAdd,
    closeButton: closeButtonAdd,
    openedClass: popupIsOpened,
    resetForm: resetFormAdd
  });

  const editPopup = new FormPopup({
    popup: popupEdit,
    openButton: openButtonEdit,
    closeButton: closeButtonEdit,
    openedClass: popupIsOpened,
    resetForm: resetFormEdit
  });

  const avatarPopup = new FormPopup({
    popup: popupAvatar,
    openButton: openButtonAvatar,
    closeButton: closeButtonAvatar,
    openedClass: popupIsOpened,
    resetForm: resetFormAvatar
  });

  const imagePopup = new ImagePopup({
    popup: popupImage,
    closeButton: closeButtonImage,
    openedClass: popupIsOpened,
    popupPicture: popupPictureElement
  });

  const cardList = new CardList({
    cardsList: placesList,
    createCard: createCard,
    openPopup: imagePopup.open,
  });

  // callbacks
  function createCard(data, openPopup) {
    const card = new Card({
      data: data,
      userId: userId,
      openPopup: openPopup,
      removeCard: api.removeCard,
      addLike: api.addLike,
      removeLike: api.removeLike
    });

    return card.create();
  };

  // usability callbacks
  function buttonUsability(button) {
    if (button.textContent === 'Сохранить') {
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = 'Сохранить';
    }
  }

  function addButtonUsability(button) {
    if (button.textContent === '+') {
      button.classList.add('popup__button_font-size');
      button.textContent = 'Загрузка...';
    } else {
      button.classList.remove('popup__button_font-size');
      button.textContent = '+';
    }
  }

  // reset callbacks
  function resetFormAdd() {
    const form = this._popup.querySelector('.popup__form');

    form.reset();
    formAddValidator.clearMessages();
    formAddValidator.setSubmitButtonState(form.checkValidity())
  };

  function resetFormEdit() {
    const form = this._popup.querySelector('.popup__form');

    userInfo.updateInputsInfo();
    formEditValidator.clearMessages();
    formEditValidator.setSubmitButtonState(form.checkValidity())
  };

  function resetFormAvatar() {
    const form = this._popup.querySelector('.popup__form');

    form.reset();
    formAvatarValidator.clearMessages();
    formAvatarValidator.setSubmitButtonState(form.checkValidity())
  }

  // handler callbacks
  function addCardHandler(event) {
    event.preventDefault();

    const place = { name: inputPlace.value, link: inputLink.value };

    addButtonUsability(addButton);
    api.uploadCard(place).then(data => {
      cardList.addCard(data);
      addPopup.close();
    })
      .catch(err => console.log(err))
      .finally(() => addButtonUsability(addButton))
  };

  function editProfileHandler(event) {
    event.preventDefault();

    const name = inputName.value;
    const about = inputAbout.value;

    buttonUsability(editButton);
    api.editProfile(name, about).then(data => {
      userInfo.setUserInfo(data);
      editPopup.close();
    })
      .catch(err => console.log(err))
      .finally(() => buttonUsability(editButton))
  };

  function avatarProfileHandler(event) {
    event.preventDefault();

    const link = inputAvatar.value;

    buttonUsability(avatarButton);
    api.setAvatar(link).then(data => {
      userInfo.setUserAvatar(data);
      avatarPopup.close();
    })
      .catch(err => console.log(err))
      .finally(() => buttonUsability(avatarButton))
  }

  // methods
  api.loadUserInfo().then(data => { userInfo.loadInfo(data); })
    .catch(err => console.log(err));
    
  api.getInitialCards().then(data => { cardList.render(data); })
    .catch(err => console.log(err));

  // listeners
  formAdd.addEventListener('submit', addCardHandler);
  formEdit.addEventListener('submit', editProfileHandler);
  formAvatar.addEventListener('submit', avatarProfileHandler);
})();
