import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import FreeCell from './FreeCell';
import PlayedCards from './PlayedCards';
import Column from './Column';

class GameSection extends Component {
  render() {
    const { store } = this.props;

    const displayFlex = {
      display: 'flex',
    }

    const gameTopStyles = {
      display: 'flex',
      height: '170px',
    }

    return (
      <div className="gameSection">
        <div className="gameTop" style={gameTopStyles}>
          <div className = "freeCells" style={displayFlex}>
            {store.game.freeCells.map(( card, columnIndex ) =>
              <FreeCell columnIndex={columnIndex} key={columnIndex} card={card}/>
            )}
          </div>
          <div className = "playedCards" style={displayFlex}>
            {store.game.playedCards.map(( cards, columnIndex ) =>
              <PlayedCards columnIndex={columnIndex} key={columnIndex} cards={cards}/>
            )}
          </div>
        </div>
        <div className="main" style={displayFlex}>
          {store.game.columns.map(( cards, columnIndex ) =>
            <Column columnIndex={columnIndex} key={columnIndex} cards={cards}/>
          )}
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(GameSection));
