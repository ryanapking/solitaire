import React, { Component } from 'react'
import { inject, observable, observer } from 'mobx-react'
import { DropTarget } from 'react-dnd';

class Column extends Component {
  render() {
    const { children, store, columnIndex, connectDropTarget, isOver } = this.props;
    var overClass = (isOver ? "column dropHere" : "column");
    return connectDropTarget(
      <div className={overClass}>
        {children}
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
    props.store.moveStack(droppedItem.columnIndex, droppedItem.rowIndex, props.columnIndex);
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
