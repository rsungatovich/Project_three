export class CardList {
  constructor(options) {
    this._cardsList = options.cardsList;
    this._createCard = options.createCard;
    this._openPopup = options.openPopup;
  }

  addCard = (data) => {
    const card = this._createCard(data, this._openPopup);
    this._cardsList.appendChild(card);
  };

  render = (cardsData) => {
    cardsData.forEach(data => {
      this.addCard(data);
    })
  };
}
