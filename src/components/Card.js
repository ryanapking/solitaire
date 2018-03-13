import React, { Component } from 'react'
import { DragSource } from 'react-dnd';

class Card extends Component {
  render() {
    const { connectDragSource, isDragging, card } = this.props;
    return connectDragSource(
      <div class="card">
        <img src={card.image}/>
      </div>
    )
  }
}

// to be sent to React DND
const cardSource = {
  beginDrag(props) {
    console.log(props);
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

export default DragSource('card', cardSource, collect)(Card);


// Knight.propTypes = {
//   connectDragSource: PropTypes.func.isRequired,
//   isDragging: PropTypes.bool.isRequired
// };

// export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
