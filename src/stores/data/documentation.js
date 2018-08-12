export default {
  autoPlay: {
    method: "autoPlay",
    description: "Runs the autoplay function, which plays all possible cards.",
    params: [
      {
        param: "none",
        description: "description here"
      }
    ],
    example: "autoPlay();",
  },

  dropCards: {
    method: "dropCards",
    description: "Drops the cards from the grabber onto a specified place on the board. Confirm that the move is legal before making it.",
    params: [
      {
        param: "columnType",
        description: "Specifies the column type: freecell, played, or column"
      },
      {
        param: "column",
        description: "The index number of the destination column, 0-7, depending on columnType"
      }
    ],
    example: 'moveCards({ \n  "columnType": "column", \n  "column": "7"\n});',
  },

  dragCards: {
    method: "dragCards",
    description: "Places cards into the grabber. Confirms that a stack of cards is eligible to be moved before grabbing them.",
    params: [
      {
        param: "columnType",
        description: "The column type of the card source."
      },
      {
        param: "column",
        description: "The column index of the cards to be grabbed."
      },
      {
        param: "row",
        description: "The row of the top card to be grabbed."
      }
    ],
    example: 'dragCards({\n  "columnType": "freecell",\n  "column": "3"\n});',
  },

  addCards: {
    method: "addCards",
    description: "Places cards from the grabber onto a column. No validation, and cards remain in the source stack. Limitations: a freecell can only hold one card. It is unknown what will happen if you attempt to add a stack of cards to a freecell...",
    params: [
      {
        param: "columnType",
        description: "The column type of the destination."
      },
      {
        param: "column",
        description: "The index of the destination."
      }
    ],
    example: 'addCards({\n  "columnType": "played",\n  "column": "0"\n});',
  },

  deleteCards: {
    method: "deleteCards",
    description: "Deletes cards from a specified place on the board. No validation.",
    params: [
      {
        param: "columnType",
        description: "The column type of the cards to be deleted."
      },
      {
        param: "column",
        description: "The column index of the cards to be grabbed."
      },
      {
        param: "row",
        description: "The row of the top card to be deleted."
      }
    ],
    example: 'dragCards({\n  "columnType": "column",\n  "column": "1",\n  "row": "5"\n});',
  },

  moveCards: {
    method: "moveCards",
    description: "some description here",
    params: [
      {
        param: "someParam",
        description: "description here"
      }
    ],
    example: 'moveCards({\n  "fromColumnType": "column",\n  "fromColumn": "6", \n  "fromRow": "1", \n  "toColumnType": "column", \n  "toColumn": "7"\n});',
  },

  clearGrabber: {
    method: "clearGrabber",
    description: "Clears cards from the grabber.",
    params: [],
    example: "clearGrabber();",
  },

  exportGameState: {
    method: "exportGameState",
    description: "Print the current gamestate to the console in a way that it can be imported later. Primary purpose is for building the levels of this game. How meta.",
    params: [],
    example: "exportGameState();",
  },

  switchLevels: {
    method: "switchLevels",
    description: "Magically change levels.",
    params: [
      {
        param: "level",
        description: "The number of the level you'd like to switch to"
      }
    ],
    example: "switchLevels(2);",
  },

  checkWinConditions: {
    method: "checkWinConditions",
    description: "Checks the current gamestate and compares it to the current level's win conditions. If the game has been won, then the level is marked as complete.",
    params: [],
    example: "checkWinConditions();",
  },

}
