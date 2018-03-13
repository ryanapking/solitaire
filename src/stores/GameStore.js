import { extendObservable, action, reaction } from 'mobx';

// class GameStore {
//
//   @observable spaces = [0, 0, 0, 1, 0, 0, 0, 0];
//
//
// }

class GameStore {
  constructor() {
    extendObservable(this, {
      spaces: [0, 0, 0, 1, 0, 0, 0, 0],
      setSpaces: action(function() {
        console.log('setSpaces triggered')
        this.spaces = [1, 0, 0, 0, 0, 0, 0, 0]
      }),
      moveCard: action(function(to) {
        this.spaces = [0, 0, 0, 0, 0, 0, 0, 0];
        this.spaces[to] = 1;
      })
    })
  }

}

export default new GameStore();
