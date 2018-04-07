import { extendObservable, action, reaction } from 'mobx';

import deck from './CardDeck';

class GameStore {
  constructor() {
    extendObservable(this, {
      columns: [
        [], [], deck.slice(0, 2), deck.slice(2,4),
        [], deck.slice(6,8), deck.slice(4, 6), []
        // deck.slice(0, 7),
        // deck.slice(7, 14),
        // deck.slice(14, 21),
        // deck.slice(21, 28),
        // deck.slice(28, 34),
        // deck.slice(34, 40),
        // deck.slice(40, 46),
        // deck.slice(46, 52)
      ],
      freeCells: [[], [], [], []],
      playedCards: [[], [], [], []],
      setSpaces: action(function() {
        // console.log('setSpaces triggered')
        this.spaces = [1, 0, 0, 0, 0, 0, 0, 0]
      }),
      moveCards: action(function(card, dragColumnIndex, dragRowIndex, dropColumnIndex) {
        // get needed card info
        let dragCardCount = this.columns[dragColumnIndex].length - dragRowIndex;
        let movingCards = this.columns[dragColumnIndex].slice(dragRowIndex, dragRowIndex + dragCardCount);
        let destinationCards = this.columns[dropColumnIndex];
        // check move validity
        let moveValid = this.checkMove(movingCards, destinationCards);
        // move cards if the action is valid
        if (moveValid) {
          this.columns[dropColumnIndex] = [...destinationCards, ...movingCards]
          this.columns[dragColumnIndex].splice(dragRowIndex, dragCardCount);
        }
      }),
      checkMove: function(movingCards, destinationCards) {
        // check that there are enough freecells to move the cards
        if (movingCards.length > this.calculateMaxMoveableCards()) {
          return false;
        }
        // check that the proposed stack of cards is a valid one
        let potentialStack = [destinationCards[destinationCards.length-1], ...movingCards];
        let stackValidity =  this.checkCardStack(potentialStack);
        // return
        return stackValidity;
      },
      checkCardStack: function(stack) {
        // confirm that card values are decrementing by one and that colors are alternating
        // shit is ugly right now
        let previousCard = null;
        let moveValidity = true;
        stack.forEach((card) => {
          if (previousCard && (card.color == previousCard.color || previousCard.value - card.value != 1) ) {
            moveValidity = false;
          }
          previousCard = card;
        })
        return moveValidity;
      },
      countEmptyColumns: function() {
        // find the number of empty columns -- and later free cells
        let emptyColumnCounter = (accumulator, currentColumn) => currentColumn.length == 0 ? ++accumulator : accumulator;
        return this.columns.reduce(emptyColumnCounter, 0);
      },
      countEmptyCells: function() {

      },
      calculateMaxMoveableCards: function() {
        return this.countEmptyColumns() + 1;
      }
    })
  }
}

export default new GameStore();
