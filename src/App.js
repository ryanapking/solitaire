import React, { Component } from 'react';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

import Card from './components/Card';
import Column from './components/Column'

import GameStore from './stores/GameStore'

console.log(GameStore);

// GameStore.setSpaces();
//
// console.log(GameStore);

class App extends Component {
  render() {
    return (
      <Provider store={GameStore}>
        <div className="App">
          <div class="main">
            {GameStore.spaces.map(( card, index ) =>
                <Column columnIndex={index}>
                  { card ? (<Card/>) : ''}
                </Column>
            )}
          </div>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(observer(App));
