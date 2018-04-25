import cardImages from '../images/cardImages';

class Card {
  constructor(suit, value, displayValue, image = null) {
    this.suit = suit.suit;
    this.color = suit.color;
    this.value = value;
    this.image = image;

    this.suitUnicode = suit.suitUnicode;
    this.displayValue = displayValue;
    this.displayColor = null;
  }
}

class Deck {
  constructor() {
    this.suits = [
      {suit: "club", suitUnicode: "\u2663", color: "black"},
      {suit: "spade", suitUnicode: "\u2660", color: "black"},
      {suit: "heart", suitUnicode: "\u2665", color: "red"},
      {suit: "diamond", suitUnicode: "\u2666", color: "red"}
    ];
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.displayValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.cards = [];

    this.suits.forEach((suit, suitIndex) => {
      this.values.forEach((value, valueIndex) => {
        this.cards.push(new Card(suit, value, this.displayValues[valueIndex], cardImages[suitIndex][value]));
      })
    })
  }
}

export class FreecellHand {
  constructor() {
    // properties used in the gamestore
    this.columns = [ [], [], [], [], [], [], [], [] ];
    this.freeCells = [null, null, null, null];
    this.playedCards = [[], [], [], []];

    // get a new deck and shuffle
    let deck = this.shuffle(new Deck().cards);

    // deal that shit
    let dealIndex = 0;
    while (deck.length > 0) {
      this.columns[dealIndex % 8].push(deck.pop());
      dealIndex++;
    }
    this.columns[0] = []
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
