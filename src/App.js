import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';

import Column from './components/Column';
import FreeCell from './components/FreeCell';
import PlayedCards from './components/PlayedCards';
import Console from './components/Console';
import CustomDragLayer from './components/CustomDragLayer';

import AppStore from './stores/AppStore'

class App extends Component {
  render() {

    const displayFlex = {
      display: 'flex',
    }

    const gameTopStyles = {
      display: 'flex',
      height: '170px',
    }

    const consoleSectionStyles = {
      width: '100%',
      padding: '25px',
    }

    return (
      <Provider store={AppStore}>
        <div className="App" style={displayFlex}>
          <CustomDragLayer />
          <div className="gameSection">
            <div className="gameTop" style={gameTopStyles}>
              <div className = "freeCells" style={displayFlex}>
                {AppStore.game.freeCells.map(( card, columnIndex ) =>
                  <FreeCell columnIndex={columnIndex} key={columnIndex} card={card}/>
                )}
              </div>
              <div className = "playedCards" style={displayFlex}>
                {AppStore.game.playedCards.map(( cards, columnIndex ) =>
                  <PlayedCards columnIndex={columnIndex} key={columnIndex} cards={cards}/>
                )}
              </div>
            </div>
            <div className="main" style={displayFlex}>
              {AppStore.game.columns.map(( cards, columnIndex ) =>
                <Column columnIndex={columnIndex} key={columnIndex} cards={cards}/>
              )}
            </div>
          </div>
          <div className="consoleSection" style={consoleSectionStyles}>
            <Console/>
          </div>
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    // GameStore.autoPlay();
  }

}

export default DragDropContext(HTML5Backend)(observer(App));
