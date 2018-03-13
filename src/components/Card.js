import React, { Component } from 'react'
import { DragSource } from 'react-dnd';

import C2 from '../images/2_of_clubs.png'

class Card extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div class="card">
        <img src={C2}/>
      </div>
    )
  }
}

// to be sent to React DND
const cardSource = {
  beginDrag(props) {
    return {};
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
