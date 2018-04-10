import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { DragSource } from 'react-dnd';

class Card extends Component {
  render() {
    const { connectDragSource, card, rowIndex, columnCardCount } = this.props;

    // styles to fan card stack and allow drag preview to show all cards being dragged
    const top = (rowIndex * 30) + 170 + 'px';
    const height = ((columnCardCount - 1 - rowIndex) * 30) + 150 + 'px';

    const cardStyles = {
      top: top,
      height: height,
    };

    return connectDragSource(
      <div className="card"  style={cardStyles}>
        <img src={card.image} alt={card.value}/>
      </div>
    )
  }
}

// to be sent to React DND
const cardSource = {
  beginDrag(props, monitor, component) {
    props.store.grabCards({
      columnType: props.columnType,
      column: props.columnIndex,
      row: props.rowIndex
    })
    return {"card": props.card};
  }
};

// to be sent to React DND
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default inject('store')(DragSource('card', cardSource, collect)(Card));
