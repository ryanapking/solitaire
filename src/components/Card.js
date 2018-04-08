import React, { Component } from 'react'
import { DragSource } from 'react-dnd';

class Card extends Component {
  render() {
    const { connectDragSource, isDragging, card, columnIndex, rowIndex, columnCardCount } = this.props;

    // styles to fan card stack and allow drag preview to show all cards being dragged
    const top = (rowIndex * 30) + 170 + 'px';
    const height = ((columnCardCount - 1 - rowIndex) * 30) + 150 + 'px';

    const cardStyles = {
      top: top,
      height: height,
    };

    return connectDragSource(
      <div className="card"  style={cardStyles}>
        <img src={card.image}/>
      </div>
    )
  }
}

// to be sent to React DND
const cardSource = {
  beginDrag(props, monitor, component) {
    // console.log("card.js component: ", component);
    // console.log("card.js props: ", props);
    // console.log("key: ", props.key);
    return {"card": props.card, "columnIndex": props.columnIndex, "rowIndex": props.rowIndex, "source": props.source};
  }
};

// to be sent to React DND
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('card', cardSource, collect)(Card);
