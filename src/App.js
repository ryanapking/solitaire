import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

import Card from './components/Card';
import Column from './components/Column'

import GameStore from './stores/GameStore'

class App extends Component {
  render() {
    return (
      <Provider store={GameStore}>
        <div className="App">
          <div className = "freeCells">

          </div>
          <div className="main">
            {GameStore.columns.map(( cards, columnIndex ) =>
              <Column columnIndex={columnIndex} key={columnIndex}>
                {cards.map(( card, index ) =>
                  <Card card={card} rowIndex={index} key={index} columnIndex={columnIndex} columnCardCount={cards.length}/>
                )}
              </Column>
            )}
          </div>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(observer(App));
