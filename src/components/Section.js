export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._card = this._renderer(item);
    this._container.prepend(this._card);
  }

  _addDeleteButton() {
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._deleteButton.classList.add('card__delete-button_show')
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this.addItem(item);
    });
  }
}