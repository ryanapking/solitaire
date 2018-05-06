const allMethods = ["autoPlay", "dropCards", "grabCards", "placeCards", "removeCards", "moveCards", "exportGameState", "switchLevels"];

export default {
  1: {
    level: 1,
    winConditions: [1],
    gameCheckConditions: [1],
    availableMethods: allMethods,
    documentedMethods: [1],
    freecellGameState: "random",
  },
  2: {
    level: 2,
    winConditions: [2],
    gameCheckConditions: [2],
    availableMethods: allMethods,
    documentedMethods: [2],
    freecellGameState: {"columns":[["22","311","49","39","25","34","313"],["213","47","33","48","112","29","210"],["28","111","41","37","113","310","36"],["32","110","11","21","12","412","23"],["413","15","46","211","45","312","411"],["410","17","35","18","44","42"],["31","19","212"],["27","38","16","24","26","13"]],"freeCells":[null,null,"43","14"],"playedCards":[[],[],[],[]]},
  },
  3: {
    level: 3,
    winConditions: [3],
    gameCheckConditions: [3],
    availableMethods: allMethods,
    documentedMethods: [3],
    freecellGameState: "random",
  }
}
