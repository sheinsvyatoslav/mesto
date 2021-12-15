export default class UserInfo {
  constructor ({profileNameSelector, profileAboutSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._avatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileAbout.textContent}
  }

  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}