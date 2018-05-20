import gameLevels from './data/gameLevels';

class Level {
  constructor(levelData) {
    this.level = levelData.level;
    this.winConditions = levelData.winConditions;
    this.gameCheckConditions = levelData.gameCheckConditions;
    this.availableMethods = levelData.availableMethods;
    this.documentation = levelData.documentation;
  }
}

export class LevelManager {
  constructor(initialLevel = 1) {
    this.levels = gameLevels;
    this.setCurrentLevel(initialLevel);
  }
  setCurrentLevel(level) {
    this.currentLevel = new Level(this.levels[level]);
  }
}
