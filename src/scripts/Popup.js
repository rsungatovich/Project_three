export class Popup {
  constructor(popup, closeButton, openedClass) {
    this._popup = popup;
    this._closeButton = closeButton;
    this._openedClass = openedClass;
    this._setEventListener();
  }

  open = () => {
    this._popup.classList.add(this._openedClass);
  };

  close = () => {
    this._popup.classList.remove(this._openedClass);
  };

  _setEventListener = () => {
    this._closeButton.addEventListener('click', this.close);
  };
}
