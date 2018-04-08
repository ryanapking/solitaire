import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

import Card from './components/Card';
import Column from './components/Column';
import FreeCell from './components/FreeCell';
import PlayedCards from './components/PlayedCards';

import GameStore from './stores/GameStore'

class App extends Component {
  render() {
    let columnSource = "column";
    return (
      <Provider store={GameStore}>
        <div className="App">
          <div className="top">
            <div className = "freeCells">
              {GameStore.freeCells.map(( card, columnIndex ) =>
                <FreeCell columnIndex={columnIndex} key={columnIndex} card={card}/>
              )}
            </div>
            <div className = "playedCards">
              {GameStore.playedCards.map(( cards, columnIndex ) =>
                <PlayedCards columnIndex={columnIndex} key={columnIndex} cards={cards}/>
              )}
            </div>
          </div>
          <div className="main">
            {GameStore.columns.map(( cards, columnIndex ) =>
              <Column columnIndex={columnIndex} key={columnIndex}>
                {cards.map(( card, index ) =>
                  <Card card={card} rowIndex={index} key={index} columnIndex={columnIndex} columnCardCount={cards.length} source={columnSource}/>
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
