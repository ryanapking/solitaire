import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class Column extends Component {
  render() {
    const { store, columnIndex, connectDropTarget, isOver, cards } = this.props;

    let classNames = ["column"];
    let cardColor = '';

    if (isOver) {
      const canDrop = (store.game.grabber.cards && store.game.validateDrop({columnType: "column", column: columnIndex}));
      if (canDrop) {
        classNames.push("greenBG");
        cardColor = 'green';
      }
    }

    return connectDropTarget(
      <div className={classNames.join(' ')}>
        {cards.map((card, index) => {
          // only send card color for the last card in the column
          const sendColor = (index === cards.length-1) ? cardColor : '';
          return (
            <Card key={index} card={card} rowIndex={index} columnIndex={columnIndex} columnCardCount={cards.length} columnType="column" cardColor={sendColor}/>
          )
        }
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
      columnType: "column",
      column: props.columnIndex
    })
  }
};

// to be sent to React DND
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default inject('store')(DropTarget('card', columnTarget, collect)(Column));
