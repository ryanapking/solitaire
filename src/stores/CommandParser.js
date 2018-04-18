class CommandParser {
  constructor() {
    this.allMethods = ["autoPlay", "dropCards", "grabCards", "placeCards", "removeCards", "moveCards"];
    this.availableMethods = this.allMethods;
  }

  // Only method called from GameStore
  // Accepts a string and returns an array of JSON objects that can be run by the gamestore
  parseCommands(commandString) {
    let commands = this.splitCommands(commandString)
      .map((command) => this.validateMethod(command))
      .map((command) => this.JSONifyCommand(command));

    return commands;
  }

  splitCommands(commandString) {
    // splits the string into an array of strings, removing anything "commented out"
    let commands = commandString.split(/\r?\n/)
      .map((string) => string.indexOf("//") < 0 ? string : string.substr(0, string.indexOf("//")) )
      .map((string) => string.trim())
      .join("")
      .split(";")
      .filter((string) => string.length > 0)
      .map((string) => {
        let openingParen = string.indexOf("(");
        let closingParen = string.lastIndexOf(")");
        let method = openingParen < 0 ? string : string.substr(0, openingParen);
        let dataString = (closingParen < 0 || openingParen < 0) ? string : string.substr(openingParen + 1, closingParen - openingParen - 1);
        return {
          "method": (method.length === 0) ? "null" : method,
          "dataString": (dataString.length === 0) ? "{}" : dataString,
          "data": null,
          "message": null
        }
      });
    return commands;
  }

  JSONifyCommand(command) {
    // attempts to parse the JSON string
    if (!command.message) {
      try {
        command.data = JSON.parse(command.dataString);
      }
      catch(error) {
        command.message = `Error processing JSON string "${command.dataString}": ${error.message}`;
      }
    }

    return command;
  }

  validateMethod(command) {
    if (!this.availableMethods.includes(command.method)) {
      command.message = `${command.method} is not a valid command.`;
    }

    return command;
  }
}

let commandParser = new CommandParser();

export default commandParser;
