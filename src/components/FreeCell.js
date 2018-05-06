import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class FreeCell extends Component {
  render() {
    const { columnIndex, connectDropTarget, isOver, store } = this.props;

    let classNames = ['freeCell'];
    let cardColor = '';

    if (isOver) {
      const canDrop = (store.game.grabber.cards && store.game.validateDrop({columnType: "freeCell", column: columnIndex}));
      if (canDrop) {
        classNames.push("greenBG");
        cardColor = canDrop ? 'green' : '';
      }
    }

    if (this.props.card) classNames.push("hideBorder");

    return connectDropTarget(
      <div className={classNames.join(' ')}>
        <div className="cardRatioContainer">
          {this.props.card
            ? <Card card={this.props.card} columnIndex={columnIndex} columnType="freeCell" cardColor={cardColor} />
            : null
          }
        </div>
      </div>
    )

  }
}

// monitor.getItem() pulls in what was return by beginDrag
// to be sent to React DND
const columnTarget = {
  drop(props, monitor, component) {
    props.store.game.dropCards({
      columnType: "freeCell",
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

export default inject('store')(DropTarget('card', columnTarget, collect)(FreeCell));
