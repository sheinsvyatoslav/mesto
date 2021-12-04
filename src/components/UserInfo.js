export default class UserInfo {
  constructor ({profileNameSelector, profileAboutSelector}) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileAbout.textContent}
  }

  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}