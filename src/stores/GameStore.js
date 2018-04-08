import { extendObservable, action, reaction } from 'mobx';

import hand from './gameHand';

class GameStore {
  constructor() {
    extendObservable(this, {
      // used to draw the board
      columns: hand.columns,
      freeCells: hand.freeCells,
      playedCards: hand.playedCards,


      // cannot currently move from freecell to freecell
      // maybe disallow this in the front end

      // used to manipulate the above values
      moveToFreeCell: action(function(cardColumn, cardRow, freeCellColumn) {
        console.log("moveToFreeCell called. Params: ", cardColumn, cardRow, freeCellColumn)
        // cell must be empty
        let cellEmpty = !this.freeCells[freeCellColumn];
        // must only be moving one card
        let oneCard = (this.columns[cardColumn].length - cardRow) > 1 ? false : true;
        if ( cellEmpty && oneCard ) {
          this.freeCells[freeCellColumn] = this.columns[cardColumn][cardRow];
          this.columns[cardColumn] = this.columns[cardColumn].filter((card, index) => index < cardRow);
          this.autoPlay();
        }
      }),

      moveFromFreeCell: action(function(freeCellColumn, destinationColumn) {
        console.log("moveFromFreeCell called. Params: ", freeCellColumn, destinationColumn);
        // destination cell must create a valid stack
        let freeCellCard = this.freeCells[freeCellColumn];
        let destinationCard = this.getTopCard(this.columns[destinationColumn]);
        let stackValid = this.checkCardStack([...destinationCard, freeCellCard]);
        if (stackValid) {
          this.columns[destinationColumn] = [...this.columns[destinationColumn], freeCellCard];
          this.freeCells[freeCellColumn] = null;
          this.autoPlay();
        }
      }),

      moveStack: action(function(moveStackColumn, moveStackRow, destinationColumn) {
        console.log("moveStack called. Params: ", moveStackColumn, moveStackRow, destinationColumn);
        // get needed card info
        let movingCardStack = this.columns[moveStackColumn].filter((card, index) => index >= moveStackRow);
        let destinationCard = this.getTopCard(this.columns[destinationColumn]);

        // add check to confirm number of cards moving

        // check move validity
        let stackValid = this.checkCardStack([...destinationCard, ...movingCardStack]);
        // move cards if the action is valid
        if (stackValid) {
          this.columns[destinationColumn] = [...this.columns[destinationColumn], ...movingCardStack]
          this.columns[moveStackColumn] = this.columns[moveStackColumn].filter((card, index) => index < moveStackRow);
          this.autoPlay();
        }
      }),

      playCardFromStack: action(function(cardColumn, cardRow, playedCardsColumn) {
        console.log("playCardFromStack called. Params: ", cardColumn, cardRow, playedCardsColumn);
        // card must not be buried
        let cardMoveable = ( cardRow == this.columns[cardColumn].length-1 );
        // destination column must create a valid play
        let topPlayedCard = this.getTopCard(this.playedCards[playedCardsColumn]);
        let card = this.columns[cardColumn][cardRow];
        let stackValid = this.checkPlayStack([...topPlayedCard, card])

        if (cardMoveable && stackValid) {
          this.playedCards[playedCardsColumn] = [...this.playedCards[playedCardsColumn], card];
          this.columns[cardColumn] = this.columns[cardColumn].filter((card, index) => index < cardRow);
          this.autoPlay();
          return true;
        } else {
          return false
        }
      }),

      playCardFromFreeCell: action(function(freeCellColumn, playedCardsColumn) {
        let topPlayedCard = this.getTopCard(this.playedCards[playedCardsColumn]);
        let card = this.freeCells[freeCellColumn];
        let stackValid = this.checkPlayStack([...topPlayedCard, card])

        if (stackValid) {
          this.playedCards[playedCardsColumn] = [...this.playedCards[playedCardsColumn], card];
          this.freeCells[freeCellColumn] = null;
          this.autoPlay();
          return true;
        } else {
          return false;
        }
      }),



      // helper functions
      getTopCard: function(stack) {
        // returns the top element of an array
        if (stack.length > 0) {
          return [stack[stack.length-1]];
        }
          return [];
      },
      checkPlayStack: function(stack) {
        // checks if this is the first card played, and if it's an ace
        if ( stack.length == 1 ) {
          if (stack[0].value == 1 ) {
            return true;
          }
        // check if the suits match and the cars have incremented by one
        } else if (stack[0].suit == stack[1].suit && stack[0].value - stack[1].value == -1) {
          return true;
        } else {
          return false;
        }

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
        let emptyColumnCounter = (accumulator, currentColumn) => currentColumn.length == 0 ? ++accumulator : accumulator;
        return this.columns.reduce(emptyColumnCounter, 0);
      },
      countEmptyCells: function() {
        let emptyCellCounter = (accumulator, currentCell) => currentCell == null ? ++accumulator : accumulator;
        return this.freeCells.reduce(emptyCellCounter, 0);
      },
      calculateMaxMoveableCards: function() {
        // make sure not to count the column that cards are being moved into as being free
        let freeCellMove = this.countEmptyColumns() + 1;
      },

      // Autoplay functions
      // currently plays ALL playable cards
      autoPlay: function() {
        console.log("autoplaying");
        let checkColumn = 0;
        let checkFreeCell = 0;
        while(checkColumn < 8 || checkFreeCell < 4) {
          if (checkFreeCell < 4) {
            this.checkIfCardCanPlayFromFreeCell(checkFreeCell);
            checkFreeCell++;
          } else if (checkColumn < 8) {
            let checkRow = this.columns[checkColumn].length-1;
            this.checkIfCardCanPlayFromStack(checkColumn, checkRow);
            checkColumn++;
          } else {
            checkColumn++;
            checkFreeCell++
          }
        }
      },
      checkIfCardCanPlayFromStack(cardColumn, cardRow) {
        for(var i = 0; i < 4; i++) {
          if (this.playCardFromStack(cardColumn, cardRow, i)) {
            break;
          }
        }
      },
      checkIfCardCanPlayFromFreeCell(freeCellColumn) {
        if (!this.freeCells[freeCellColumn]) return;
        for(var i = 0; i < 4; i++) {
          if (this.playCardFromFreeCell(freeCellColumn, i)) {
            break;
          }
        }
      }

    })
  }
}

export default new GameStore();
