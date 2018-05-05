class Level {
  constructor(levelData) {
    this.winConditions = levelData.winConditions;
    this.gameCheckConditions = levelData.gameCheckConditions;
    this.availableMethods = levelData.availableMethods;
    this.documentedMethods = levelData.documentedMethods;
  }
}

export class LevelManager {
  constructor(initialLevel = 1) {
    this.levels = {
      1: {
        winConditions: [1],
        gameCheckConditions: [1],
        availableMethods: [1],
        documentedMethods: [1],
      },
      2: {
        winConditions: [2],
        gameCheckConditions: [2],
        availableMethods: [2],
        documentedMethods: [2],
      },
      3: {
        winConditions: [3],
        gameCheckConditions: [3],
        availableMethods: [3],
        documentedMethods: [3],
      }
    }
    this.setCurrentLevel(initialLevel);
  }
  setCurrentLevel(level) {
    this.currentLevel = new Level(this.levels[level]);
  }
}
