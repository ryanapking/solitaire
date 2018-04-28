import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class PlayedCards extends Component {
  render() {
    const { store, columnIndex, connectDropTarget, isOver } = this.props;

    const playedCardsStyles = {
      width: '98px',
      height: '143px',
      border: '1px solid lightgray',
      borderRadius: '4px',
    }

    const dropStyles = {
      
    }

    return connectDropTarget(
      <div style={playedCardsStyles}>
        {this.props.cards.map((card, index) =>
          <Card key={index} card={card} columnIndex={columnIndex} columnType="played"/>
        )}
      </div>

    )
  }
}

// monitor.getItem() pulls in what was return by beginDrag
// to be sent to React DND
const columnTarget = {
  drop(props, monitor, component) {
    props.store.game.dropCards({
      columnType: "played",
      column: props.columnIndex
    });
    // props.store.playCardFromStack(droppedItem.columnIndex, droppedItem.rowIndex, props.columnIndex);
  }
};

// to be sent to React DND
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default inject('store')(DropTarget('card', columnTarget, collect)(PlayedCards));
