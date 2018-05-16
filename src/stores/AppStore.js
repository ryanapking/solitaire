import { extendObservable, action } from 'mobx';

import { CommandParser } from './CommandParser';
import { FreecellGame } from './FreecellGame';
import { LevelManager } from './LevelManager';

class AppStore {
  constructor() {
    extendObservable(this, {
      // used to draw the board
      showDocs: false,
      levelManager: new LevelManager(),
      consoleCommand: "",
      consoleHistory: "",
      game: new FreecellGame(), // replaced on initial level switch
      commandParser: new CommandParser(), // replaced on initial level switch
      runConsoleCommands: action(function() {
        // add the command to the history as typed in by the user
        if (this.consoleHistory) {
          this.consoleHistory += "\n" + this.consoleCommand;
        } else {
          this.consoleHistory = this.consoleCommand;
        }
        // calls the command parser
        let parseResults = this.commandParser.parseCommands(this.consoleCommand);

        // do not run the methods if any errors were found by the parser
        let errorCounter = (errors, command) => (command.message) ? errors + 1 : errors;
        let errorCount = parseResults.reduce(errorCounter, 0);
        if (errorCount > 0) {
          let errorCommands = parseResults.filter((command) => (!command.message))
          console.log("Error found by parser. Parser results: ", parseResults);
          return errorCommands;
        }

        let results = [];

        // run the methods
        parseResults.forEach((command) => {
          // temporary nonsense to allow me to switch levels via command
          // most functions are in the freecell game class, but this one makes more sense here
          // because it affects the available commands as well as the freecell game state
          // could be moved to the parser somehow?
          if (command.method === "switchLevels") {
            this[command.method](command.data.level);
          } else {
            console.log("logging command: ", command);
            let result = this.game[command.method](command.data);
            results = [...results, result];
          }
        });

        return results;
      }),

      // change the gamestate to another level
      switchLevels: action(function(level) {
        // create new objects with updated level data, or find some other way to manage this
        this.levelManager.setCurrentLevel(level);
        this.game = new FreecellGame(level);
        this.commandParser = new CommandParser(this.levelManager.currentLevel.availableMethods);
      }),

    })

    this.switchLevels(1);
  }
}

export default new AppStore();
