import { extendObservable, action, reaction } from 'mobx';

import deck from './CardDeck';

class GameStore {
  constructor() {
    extendObservable(this, {
      columns: [
        deck.slice(0, 7),
        deck.slice(7, 14),
        deck.slice(14, 21),
        deck.slice(21, 28),
        // deck.slice(28, 34),
        // deck.slice(34, 40),
        // deck.slice(40, 46),
        // deck.slice(46, 52)
        [], [], [], []
      ],
      freeCells: [[], [], [], []],
      playedCards: [[], [], [], []],
      setSpaces: action(function() {
        console.log('setSpaces triggered')
        this.spaces = [1, 0, 0, 0, 0, 0, 0, 0]
      }),
      moveCard: action(function(card, index) {
        console.log(card, index);
        this.columns[index] = card;
        console.log(this.columns);
      }),
      randomCard: action(function() {

      })
    })
  }
}

export default new GameStore();
