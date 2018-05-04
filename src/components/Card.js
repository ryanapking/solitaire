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

    // styles to fan card stack and allow drag preview to show all cards being dragged
    const top = (rowIndex * 30) + 'px';

    let dragLayerStyles = {};
    let hideCard = {};

    if (dragLayerOffset) {
      dragLayerStyles = {
        maxWidth: '75px',
        position: 'fixed',
        top: dragLayerOffset.y + (rowIndex * 30) + 'px',
        left: dragLayerOffset.x + 'px',
        pointerEvents: 'none',
        zIndex: 2,
      }
    } else if (store.game.grabber.cards.includes(card)) {
      hideCard = {opacity: '0'};
    }

    const cardStyles = {
      position: 'absolute',
      top: top,
      width: 'auto',
    };

    const imgStyles = {
      width: '100%',
      // width: '45px',
    }

    const clearCard = {
      opacity: '.5',
    }

    const redBackground = {
      background: 'red',
    }

    const greenBackground = {
      background: 'green',
    }

    let dropImgStyles, backgroundColor = {};
    if (cardColor === 'green') {
      dropImgStyles = clearCard;
      backgroundColor = greenBackground;
    } else if (cardColor === 'red') {
      dropImgStyles = clearCard;
      backgroundColor = redBackground;
    }


    return connectDragSource(
      <div className="card"  style={{...cardStyles, ...dragLayerStyles, ...hideCard, ...backgroundColor}}>
        <img src={card.image} alt={card.value} style={{...imgStyles, ...dropImgStyles}}/>
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
