import {Popup} from "./Popup.js";

export class FormPopup extends Popup {
  constructor(options) {
    super(options.popup, options.closeButton, options.openedClass);
    this._openButton = options.openButton;
    this._resetForm = options.resetForm;
    this._setEventListener();
  }

  open = () => {
    this._resetForm();
    this._popup.classList.add(this._openedClass);
  };

  _setEventListener = () => {
    this._openButton.addEventListener('click', this.open);
    this._closeButton.addEventListener('click', this.close);
  };
}