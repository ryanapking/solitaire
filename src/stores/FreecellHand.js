import cardImages from '../images/cardImages';

class Card {
  constructor(suit, color, value, image = null) {
    this.suit = suit;
    this.color = color;
    this.value = value;
    this.image = image;
  }
}

class Deck {
  constructor() {
    this.suits = [{suit: "club", color: "black"}, {suit: "spade", color: "black"}, {suit: "heart", color: "red"}, {suit: "diamond", color: "red"}];
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.cards = [];

    this.suits.forEach((suit, suitIndex) => {
      this.values.forEach((value, valueIndex) => {
        this.cards.push(new Card(suit.suit, suit.color, value, cardImages[suitIndex][value]));
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
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
