import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class Column extends Component {
  render() {
    const { store, columnIndex, connectDropTarget, isOver, cards } = this.props;
    let overClass = "column";
    if (isOver && store.grabber && store.validateDrop({columnType: "column", column: columnIndex})) {
      overClass += " dropHere";
    }
    return connectDropTarget(
      <div className={overClass}>
        {cards.map((card, index) =>
          <Card key={index} card={card} rowIndex={index} columnIndex={columnIndex} columnCardCount={cards.length} columnType="column"/>
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
