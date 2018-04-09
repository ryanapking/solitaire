import React, { Component } from 'react'
import { inject, observable, observer } from 'mobx-react'
import { DropTarget } from 'react-dnd';

import Card from './Card';

class PlayedCards extends Component {
  render() {
    const { children, store, columnIndex, connectDropTarget, isOver, source } = this.props;
    var overClass = (isOver ? "column dropHere" : "column");
    return connectDropTarget(
      <div className={overClass}>
        {this.props.cards.map((card, index) =>
          <Card card={card} columnIndex={columnIndex} source={source} columnType="played"/>
        )}
      </div>

    )
  }
}

// monitor.getItem() pulls in what was return by beginDrag
// to be sent to React DND
const columnTarget = {
  drop(props, monitor, component) {
    const droppedItem = monitor.getItem();
    // console.log('WTF props', props);
    // console.log("WTF monitor: ", monitor);
    // console.log("WTF component: ", component);
    // console.log("get item: ", monitor.getItem());
    props.store.dropCards({
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
