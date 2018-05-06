import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

class Card extends Component {
  componentDidMount() {
  		// Use empty image as a drag preview so browsers don't draw it
  		// and we can draw whatever we want on the custom drag layer instead.
  		this.props.connectDragPreview(getEmptyImage(), {
  			// IE fallback: specify that we'd rather screenshot the node
  			// when it already knows it's being dragged so we can hide it with CSS.
  			captureDraggingState: true,
  		})
  	}

  render() {
    const { connectDragSource, card, rowIndex, dragLayerOffset, store, cardColor } = this.props;

    let classNames = ["card"];

    const cardTopPosition = {
      top: (rowIndex * 30) + 'px',
    };

    let dragCardPosition = {};
    if (dragLayerOffset) {
      classNames.push("draggingCard");
      dragCardPosition = {
        top: dragLayerOffset.y + (rowIndex * 30) + 'px',
        left: dragLayerOffset.x + 'px',
      }
    } else if (store.game.grabber.cards.includes(card)) {
      classNames.push("hideCard");
    }

    if (cardColor === 'green') {
      classNames.push('greenCard');
    }

    return connectDragSource(
      <div className={classNames.join(' ')}  style={{...cardTopPosition, ...dragCardPosition}}>
        <img src={card.image} alt={card.value}/>
      </div>
    )
  }
}

// to be sent to React DND
const cardSource = {
  beginDrag(props, monitor, component) {
    props.store.game.grabCards({
      columnType: props.columnType,
      column: props.columnIndex,
      row: props.rowIndex
    })
    return {"card": props.card};
  },
  endDrag(props, monitor, component) {
    props.store.game.clearGrabber();
  }
};

// to be sent to React DND
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default inject('store')(DragSource('card', cardSource, collect)(observer(Card)));
