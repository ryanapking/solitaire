import { extendObservable, action } from 'mobx';

import { CommandParser } from './CommandParser';
import { FreecellGame } from './FreecellGame';
import { LevelManager } from './LevelManager';

class AppStore {
  constructor() {
    extendObservable(this, {
      // used to draw the board
      levelManager: new LevelManager(1),
      consoleCommand: "",
      consoleHistory: "",
      game: new FreecellGame(),
      commandParser: new CommandParser(),
      runConsoleCommands: action(function() {
        // add the command to the history as typed in by the user
        this.consoleHistory += this.consoleCommand + "\n";
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
          console.log("logging command: ", command);
          let result = this.game[command.method](command.data);
          results = [...results, result];
        });

        return results;
      }),

    })
  }
}

export default new AppStore();
