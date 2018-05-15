import { extendObservable, action } from 'mobx';
import { FreecellHand } from './FreecellHand';
import { RED, BLACK } from './constants';

export class FreecellGame {
  constructor(level = 1) {
    let hand = new FreecellHand(level);
    extendObservable(this, {
      // used to draw the board
      columns: hand.columns,
      freeCells: hand.freeCells,
      playedCards: hand.playedCards,
      grabber: {
        success: 1,
        message: "Grabber initiated",
        requestData: {},
        cards: []
      },

      // used for determine if a card should be autoplayed
      maxAutoPlayRed: 2,
      maxAutoPlayBlack: 2,

      // validates a drop, then takes needed actions if it's a valid move. Called by react drag and drop
      dropCards: action(function(dropData) {
        // console.log("drop request: ", dropData);
        // useless assignments to help me know what's going on
        let columnType = dropData.columnType;
        let column = dropData.column;

        // check drop validity
        let dropValid = this.validateDrop(dropData);

        // move cards if drop valid
        if (dropValid) {
          // place cards
          // console.log("placing dropped cards");
          this.addCards({
            columnType: columnType,
            column: column
          });

          // remove cards
          // console.log("removing dropped cards");
          this.deleteCards({
            columnType: this.grabber.requestData.columnType,
            column: this.grabber.requestData.column,
            row: this.grabber.requestData.row
          });


          this.autoPlay();
        }

        // clear grabber
        // console.log("clearing grabber");
        this.grabber.cards = [];

        return dropValid;
      }),

      // puts cards into the grabber (card remain in both places)
      dragCards: action(function(grabData) {
        // console.log("grab request: ", grabData);
        // useless assignments to help me know what's going on
        let columnType = grabData.columnType;
        let column = grabData.column;
        let row = grabData.row;

        let response = {
          // we ASSUME success...
          success: 1,
          message: "Grab success. Probably.",
          requestData: grabData,
          cards: []
        }

        switch(columnType) {
          case "column": {
            response.cards = this.columns[column].filter((card, index) => index >= row);
            break;
          }
          case "freeCell": {
            response.cards = [this.freeCells[column]];
            break;
          }
          default: {
            response.message = "Grab error. Was your grab request valid?!? Read the documentation!";
            response.success = 0;
            break;
          }
        }

        this.grabber = response;
        // console.log("grabber status: ", this.grabber);
        return response;
      }),

      // places cards from the grabber onto a column - no validation (cards remain in grabber and are not deleted from origin column)
      addCards: action(function(placeData) {
        // console.log("place request: ", placeData);
        // useless assignments to help me know what's going on
        let columnType = placeData.columnType;
        let column = placeData.column;

        let response = {
          success: 1, // we ASSUME success...
          message: "Place success. Probably.",
          requestData: placeData
        }

        // console.log("placing cards");
        switch(columnType) {
          case "column": {
            this.columns[column] = [...this.columns[column], ...this.grabber.cards];
            break;
          }
          case "freeCell": {
            this.freeCells[column] = this.grabber.cards[0];
            break;
          }
          case "played": {
            this.playedCards[column] = [...this.playedCards[column], ...this.grabber.cards];
            this.setMaxAutoPlay();
            break;
          }
          default: {
            response.message = "Place error. Was your place request valid?!? Read the documentation!";
            response.success = 0;
            break;
          }
        }

        // console.log("placement response: ", response);
        return response;
      }),

      // removes cards from a column - no validation
      deleteCards: action(function(removeData) {
        // useless assignments to help me know what's going on
        let columnType = removeData.columnType;
        let column = removeData.column;
        let row = removeData.row;

        let response = {
          success: 1, // we ASSUME success...
          message: "Remove success. Probably.",
          requestData: removeData
        };

        switch(columnType) {
          case "column": {
            this.columns[column] = this.columns[column].filter((card, index) => index < row);
            break;
          }
          case "freeCell": {
            this.freeCells[column] = null;
            break;
          }
          case "played": {
            this.playedCards[column] = this.playedCards[column].filter((card, index) => index < row);
            break;
          }
          default: {
            response.message = "Remove card error. Was your remove request valid?!? Read the documentation!";
            response.success = 0;
            break;
          }
        }

        // console.log("remove response: ", response);
        return response;
      }),

      // runs a move request, includes deleting from one row and adding to another - no validation
      moveCards: action(function(moveData) {
        const fromColumnType = moveData.fromColumnType;
        const fromColumn = moveData.fromColumn;
        const fromRow = moveData.fromRow;
        const toColumnType = moveData.toColumnType;
        const toColumn = moveData.toColumn;

        this.dragCards({
          columnType: fromColumnType,
          column: fromColumn,
          row: fromRow,
        });

        console.log("grabber: ", this.grabber);

        this.addCards({
          columnType: toColumnType,
          column: toColumn,
        });

        this.deleteCards({
          columnType: fromColumnType,
          column: fromColumn,
          row: fromRow,
        });

        this.clearGrabber();
      }),

      // clears cards from the grabber
      clearGrabber: action(function() {
        this.grabber.cards = [];
      }),

      // Autoplay functions to avoid excessive clicking/dragging
      autoPlay: action(function() {
        // console.log("autoplaying");

        // check freecells for playable cards
        for (let i = 0; i < 4; i++) {
          const checkCard = this.freeCells[i];
          if (checkCard) {
            for (let j = 0; j < 4; j++) {
              const proposedStack = [...this.playedCards[j], checkCard];
              if (checkCard.value <= this.getMaxAutoPlay(checkCard.color)) {
                if (this.checkPlayStack(proposedStack)) {
                  this.dragCards({
                    columnType: "freeCell",
                    column: i
                  });
                  this.dropCards({
                    columnType: "played",
                    column: j
                  });
                  i = j = 5;
                }
              }
            }
          }
        }

        // check main columns for playable cards
        for (let i = 0; i < 8; i++) {
          const topCardArray = this.getTopCard(this.columns[i]);
          const checkCard = (topCardArray.length > 0) ? topCardArray[0] : null;
          if (checkCard) {
            for (let j = 0; j < 4; j++) {
              let proposedStack = [...this.playedCards[j], checkCard];
              if (checkCard.value <= this.getMaxAutoPlay(checkCard.color)) {
                if (this.checkPlayStack(proposedStack)) {
                  this.dragCards({
                    columnType: "column",
                    column: i,
                    row: this.columns[i].length-1
                  });
                  this.dropCards({
                    columnType: "played",
                    column: j
                  });
                  i = j = 9;
                }
              }
            }
          }
        }
      }),

      // win condition checks
      confirmEmptyBoard: function() {
        if (this.countEmptyCells() === 4 && this.countEmptyColumns() === 8) {
          console.log("winner winner: board empty");
        } else {
          console.log("nope nope: board not yet empty");
        }
      },

      confirmPlayedCardCount: function() {
        const reducer = (accumulator, currentStack) => accumulator + currentStack.length;
        const totalPlayedCards = this.playedCards.reduce(reducer, 0);

        if (totalPlayedCards === 52) {
          console.log("winner winner: 52 cards played");
        } else {
          console.log("nope nope: 52 cards not yet played");
        }
      },

      confirmPlayedCardStacks: function() {
        const results = this.playedCards.map((playedCardStack, index) => {
          let valid = true;
          if (playedCardStack.length !== 13) valid = false;
          if (valid && playedCardStack[0].value !== 1) valid = false;
          if (valid && !this.checkPlayStack(playedCardStack)) valid = false;
          return valid;
        });
        if (results.includes(false)) {
          console.log("nope nope: stacks not fully valid");
        } else {
          console.log("winner winner: stacks completely validated");
        }
      },

      // helper functions
      validateDrop: function(dropData) {
        // confirms that a drop meets the freecells rules
        // console.log("drop request: ", dropData);
        // useless assignments to help me know what's going on
        let columnType = dropData.columnType;
        let column = dropData.column;

        // check if stack is too big
        let maxMoveableCards = this.calculateMaxMoveableCards(column);
        if (this.grabber.cards.length > maxMoveableCards) {
          // console.log("card stack too big to move");
          return false;
        }

        switch(columnType) {
          case "column": {
            let dropTopCard = this.getTopCard(this.columns[column]);
            let proposedStack = [...dropTopCard, ...this.grabber.cards];
            let validStack = this.checkCardStack(proposedStack);
            if (validStack) {return true} else return false;
          }
          case "freeCell": {
            let cellEmpty = this.freeCells[column] == null;
            let oneCard = this.grabber.cards.length === 1;
            if (cellEmpty && oneCard) {return true} else return false;
          }
          case "played": {
            let dropTopCard = this.getTopCard(this.playedCards[column]);
            let proposedStack = [...dropTopCard, ...this.grabber.cards];
            let validStack = this.checkPlayStack(proposedStack);
            if (validStack) {return true} else return false;
          }
          default: {
            return false;
          }
        }
      },

      getTopCard: function(stack) {
        // returns the top element of an array
        if (stack.length > 0) {
          return [stack[stack.length-1]];
        }
          return [];
      },

      checkPlayStack: function(stack) {
        // if stack is one card and it's an ace, we are done
        if (stack.length === 1) {
          if (stack[0].value === 1) {
            return true
          } else {
            return false
          };
        }

        let valid = true;
        stack.forEach((currentCard, currentIndex) => {
          const previousCard = (currentIndex > 0) ? stack[currentIndex-1] : null;
          if (previousCard && (currentCard.suit !== previousCard.suit || currentCard.value - previousCard.value !== 1)) {
            valid = false;
          }
        });

        return valid;
      },

      checkCardStack: function(stack) {
        // confirm that card values are decrementing by one and that colors are alternating
        // shit is ugly right now
        let previousCard = null;
        let moveValidity = true;
        stack.forEach((card) => {
          if (previousCard && (card.color === previousCard.color || previousCard.value - card.value !== 1) ) {
            moveValidity = false;
          }
          previousCard = card;
        })
        return moveValidity;
      },

      countEmptyColumns: function(ignoreColumn = null) {
        let emptyColumnCounter = (accumulator, currentColumn, index) => (currentColumn.length === 0 && index !== ignoreColumn) ? ++accumulator : accumulator;
        return this.columns.reduce(emptyColumnCounter, 0);
      },

      countEmptyCells: function() {
        let emptyCellCounter = (accumulator, currentCell) => currentCell == null ? ++accumulator : accumulator;
        return this.freeCells.reduce(emptyCellCounter, 0);
      },

      calculateMaxMoveableCards: function(destinationColumn = null) {
        let emptyFreeCellCount = this.countEmptyCells();
        let emptyColumnCount = this.countEmptyColumns(destinationColumn);
        let maxMoveableCards = (emptyFreeCellCount + 1) + ((emptyFreeCellCount + 1) * emptyColumnCount);
        // console.log("max moveable cards: ", maxMoveableCards);
        return maxMoveableCards;
      },

      setMaxAutoPlay: function() {
        let redPlayed = [];
        let blackPlayed = [];
        this.playedCards.forEach((column) => {
          let topCard = this.getTopCard(column)[0];
          // console.log(topCard);
          if (topCard && topCard.color === RED) {
            redPlayed = [...redPlayed, topCard.value];
          } else if (topCard && topCard.color === BLACK) {
            blackPlayed = [...blackPlayed, topCard.value];
          }
        })

        let lowRedPlayed = (redPlayed.length > 1) ? Math.min(...redPlayed) : 0;
        let lowBlackPlayed = (blackPlayed.length > 1) ? Math.min(...blackPlayed) : 0;

        this.maxAutoPlayRed = lowBlackPlayed + 2;
        this.maxAutoPlayBlack = lowRedPlayed + 2;

        // console.log("Max autoplay red: ", this.maxAutoPlayRed);
        // console.log("Max autoplay black: ", this.maxAutoPlayBlack);
      },

      getMaxAutoPlay: function(color) {
        if (color === RED) {
          return this.maxAutoPlayRed;
        } else if (color === BLACK) {
          return this.maxAutoPlayBlack;
        } else {
          // return something else just in case
          return 2;
        }
      },

      // log current gamestate as a json string, to make building levels easier
      exportGameState: function() {
        let columns = this.columns.map((column) => {
          return column.map((card) => {
            return `${card.suit}${card.value}`;
          });
        });

        let playedCards = this.playedCards.map((playedCardsColumn) => {
          return playedCardsColumn.map((card) => {
            return `${card.suit}${card.value}`;
          });
        });

        let freeCells = this.freeCells.map((card) => {
          return card ? `${card.suit}${card.value}` : null;
        });

        const gameState = {columns: columns, freeCells: freeCells, playedCards: playedCards};
        console.log("gameState: ", JSON.stringify(gameState));
      },

    })
  }
}
