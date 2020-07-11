export class FormValidator {
  constructor(form, selectors) {
    this._form = form;
    Object.assign(this, selectors);
    this._setEventListener();
  }

  clearMessages = () => {
    Array.from(this._messages).forEach(message => message.textContent = '');
  }

  setSubmitButtonState = (valid) => {
    if (valid) {
      this._submit.removeAttribute('disabled');
      this._submit.classList.add(this._buttonIsActive);
    } else {
      this._submit.setAttribute('disabled', true);
      this._submit.classList.remove(this._buttonIsActive);
    }
  };

  _checkInputValidity = (input) => {
    const message = this._form.querySelector(`#${input.id}Error`);

    if (input.validity.valueMissing) {
      message.textContent = 'Это обязательное поле';
    } else if (input.validity.tooShort) {
      message.textContent = 'Должно быть от 2 до 30 символов';
    } else if (input.validity.typeMismatch) {
      message.textContent = 'Здесь должна быть ссылка на картинку';
    } else {
      message.textContent = '';
    }
  }

  _listenerHandler = (event) => {
    this._checkInputValidity(event.target);
    this.setSubmitButtonState(this._form.checkValidity());
  }

  _setEventListener = () => {
    this._submit = this._form.querySelector(this._buttonSelector);
    this._messages = this._form.querySelectorAll(this._messageSelector);
    this._form.addEventListener('input', this._listenerHandler);
  };
}
