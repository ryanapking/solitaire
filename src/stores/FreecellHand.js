import cardImages from '../images/cardImages';
import { CLUB, SPADE, DIAMOND, HEART, RED, BLACK } from './constants';
import gameStates from './gameStates';

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
      {suit: CLUB, suitUnicode: "\u2663", color: BLACK},
      {suit: SPADE, suitUnicode: "\u2660", color: BLACK},
      {suit: HEART, suitUnicode: "\u2665", color: RED},
      {suit: DIAMOND, suitUnicode: "\u2666", color: RED}
    ];
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.displayValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.cards = [];
    this.fullDeck = {};

    this.suits.forEach((suit, suitIndex) => {
      this.values.forEach((value, valueIndex) => {
        const newCard = new Card(suit, value, this.displayValues[valueIndex], cardImages[suitIndex][value]);
        this.cards.push(newCard);
        this.fullDeck[`${newCard.suit}${newCard.value}`] = newCard;
      })
    })

  }
}

export class FreecellHand {
  constructor(level = "random") {
    // properties used in the gamestore
    this.columns = [ [], [], [], [], [], [], [], [] ];
    this.freeCells = [null, null, null, null];
    this.playedCards = [[], [], [], []];

    if (level === "random") {
      this.randomDeal();
    } else {
      this.gameStateDeal();
    }
  }

  randomDeal() {
    // get a new deck and shuffle
    let deck = this.shuffle(new Deck().cards);

    // deal that shit
    let dealIndex = 0;
    while (deck.length > 0) {
      this.columns[dealIndex % 8].push(deck.pop());
      dealIndex++;
    }
  }

  // takes an abbreviated gamestate, as exported from FreecellGame, and deals it
  gameStateDeal(level = "level1") {
    const fullDeck = new Deck().fullDeck;
    const gameState = gameStates[level];

    this.columns = gameState.columns.map((column) => {
      return column.map((cardAbbreviation) => {
        return fullDeck[cardAbbreviation];
      });
    });

    this.playedCards = gameState.playedCards.map((playedCardsColumn) => {
      return playedCardsColumn.map((cardAbbreviation) => {
        return fullDeck[cardAbbreviation];
      });
    });

    this.freeCells = gameState.freeCells.map((cardAbbreviation) => {
      return cardAbbreviation ? fullDeck[cardAbbreviation] : null;
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
