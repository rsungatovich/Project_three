export class UserInfo {
  constructor(options) {
    this._nameContent = options.nameContent;
    this._aboutContent = options.aboutContent;
    this._inputName = options.inputName;
    this._inputAbout = options.inputAbout;
    this._imageAvatar = options.imageAvatar;
  }

  loadInfo = (data) => {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
    this.updateUserInfo();
    this.updateInputsInfo();
    this.updateUserAvatar();
  }

  setUserAvatar = (data) => {
    this._avatar = data.avatar;
    this.updateUserAvatar();
  }

  setUserInfo = (data) => {
    this._name = data.name;
    this._about = data.about;
    this.updateUserInfo();
    this.updateInputsInfo();
  };

  updateUserInfo = () => {
    this._nameContent.textContent = this._name;
    this._aboutContent.textContent = this._about;
  };

  updateInputsInfo = () => {
    this._inputName.value = this._name;
    this._inputAbout.value = this._about;
  }

  updateUserAvatar = () => {
    this._imageAvatar.style.backgroundImage = `url(${this._avatar})`;
  }
}
