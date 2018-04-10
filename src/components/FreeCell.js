import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class FreeCell extends Component {
  render() {
    const { store, columnIndex, connectDropTarget, isOver } = this.props;
    let overClass = "column";
    if (isOver && store.grabber && store.validateDrop({columnType: "freeCell", column: columnIndex})) {
      overClass += " dropHere";
    }
    return connectDropTarget(
      <div className={overClass}>
        {this.props.card
          ? <Card card={this.props.card} columnIndex={columnIndex} columnType="freeCell"/>
          : null
        }
      </div>

    )
  }
}

// monitor.getItem() pulls in what was return by beginDrag
// to be sent to React DND
const columnTarget = {
  drop(props, monitor, component) {
    props.store.dropCards({
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
