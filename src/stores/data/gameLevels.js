import docs from './documentation';

const allMethods = ["autoPlay", "dropCards", "grabCards", "placeCards", "removeCards", "moveCards", "exportGameState", "switchLevels", "checkWinConditions"];
const allDocs = [docs.autoPlay, docs.dropCards, docs.dragCards, docs.addCards, docs.deleteCards, docs.moveCards, docs.clearGrabber, docs.exportGameState, docs.switchLevels, docs.checkWinConditions];
// a won game that can be used for testing win conditions
const wonGameState = {"columns":[[],[],[],[],[],[],[],[]],"freeCells":[null,null,null,null],"playedCards":[["21","22","23","24","25","26","27","28","29","210","211","212","213"],["31","32","33","34","35","36","37","38","39","310","311","312","313"],["11","12","13","14","15","16","17","18","19","110","111","112","113"],["41","42","43","44","45","46","47","48","49","410","411","412","413"]]};

export default {
  1: {
    level: 1,
    winConditions: ['confirmEmptyBoard', 'confirmPlayedCardCount', 'confirmPlayedCardStacks'],
    gameCheckConditions: [1],
    availableMethods: allMethods,
    documentation: allDocs,
    freecellGameState: wonGameState,
  },
  2: {
    level: 2,
    winConditions: ['confirmEmptyBoard'],
    gameCheckConditions: [2],
    availableMethods: allMethods,
    documentation: allDocs,
    freecellGameState: {"columns":[["22","311","49","39","25","34","313"],["213","47","33","48","112","29","210"],["28","111","41","37","113","310","36"],["32","110","11","21","12","412","23"],["413","15","46","211","45","312","411"],["410","17","35","18","44","42"],["31","19","212"],["27","38","16","24","26","13"]],"freeCells":[null,null,"43","14"],"playedCards":[[],[],[],[]]},
  },
  3: {
    level: 3,
    winConditions: ['confirmEmptyBoard'],
    gameCheckConditions: [3],
    availableMethods: allMethods,
    documentation: allDocs,
    freecellGameState: "random",
  }
}
