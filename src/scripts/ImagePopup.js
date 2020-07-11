import {Popup} from "./Popup.js";

export class ImagePopup extends Popup {
  constructor(options) {
    super(options.popup, options.closeButton, options.openedClass);
    this._popupPicture = options.popupPicture;
  }

  open = (event) => {
    this._addImageToPopup(event);
    this._popup.classList.add(this._openedClass);
  };

  _addImageToPopup = (event) => {
    const link = event.target.dataset.link;
    this._popupPicture.setAttribute('src', `${link}`);
  };
}
