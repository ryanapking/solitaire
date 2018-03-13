import React, { Component } from 'react'
import { inject, observable, observer } from 'mobx-react'
import { DropTarget } from 'react-dnd';

class Column extends Component {
  render() {
    const { children, store, columnIndex, connectDropTarget, isOver } = this.props;
    console.log("isOver: ", isOver);
    var overClass = (isOver ? "column dropHere" : "column");
    return connectDropTarget(
      <div class={overClass}>
        {children}
      </div>

    )
  }
}

// injects the store into the above class
// no longer needed, I think
// Column = inject('store')(observer(Column))

// to be sent to React DND
const columnTarget = {
  drop(props) {
    console.log('WTF', props);
    props.store.moveCard(props.columnIndex);
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
