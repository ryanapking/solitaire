import React, { Component } from 'react';
import { inject } from 'mobx-react';
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
    const { connectDragSource, card, rowIndex, columnCardCount, isDragging, dragLayer } = this.props;

    // styles to fan card stack and allow drag preview to show all cards being dragged
    const indCardHeight = 150;
    const top = (rowIndex * 30) + 170 + 'px';
    const height = ((columnCardCount - 1 - rowIndex) * 30) + 150 + 'px';

    const hideCard = {
      // opacity: isDragging ? 0 : 1,
    }

    const draggingStyles = dragLayer ? {
      position: 'fixed',
      top: '25px',
      left: '25px',
    } : {};

    const cardStyles = {
      top: top,
      height: height,

      // color: card.color,
      // width: '100px',
      // borderRadius: '5px',
      // backgroundColor: 'white',
      // border: "1px solid black"
    };

    const cardFrontStyles = {
      position: 'relative'
    }

    const cardTopStyles = {
      position: 'absolute',
      boxSizing: 'border-box',
      top: '0',
      width: '100%',
      height: '20%',
      fontSize: indCardHeight * .115 + 'px',
      lineHeight: indCardHeight * .115 + 'px',
    }

    const cardBottomStyles = {
      position: 'absolute',
      boxSizing: 'border-box',
      bottom: '0',
      height: '20%',
      width: '100%',
      transform: "rotate(180deg)"
    }

    const cardMiddleStyles = {
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      height: '60%',
      top: '20%',
      paddingTop: indCardHeight * .1 + 'px',
      fontSize: indCardHeight * .4 + 'px',
      lineHeight: indCardHeight * .4 + 'px'
    }

    const valueAlign = {
      display: 'inline-block',
      boxSizing: 'border-box',
      width: '50%',
      paddingRight: '28%',
      paddingTop: '4%',
      textAlign: 'center',
      letterSpacing: '-1px',
    }

    const suitAlign = {
      display: 'inline-block',
      boxSizing: 'border-box',
      width: '50%',
      textAlign: 'right',
      paddingRight: '5%',
    }

    const alignRight = {
      display: 'inline-block',
      width: '50%',
      textAlign: 'right'
    }

    const hide = {
      display: "none"
    }

    return connectDragSource(
      <div className="card"  style={{...cardStyles, ...hideCard, ...dragLayer}}>
        <div className="cardFront" style={hide}>
          <div className="cardTop" style={cardTopStyles}>
            <div className="value" style={valueAlign}>{card.displayValue}</div>
            <div className="suit" style={suitAlign}>{card.suitUnicode}</div>
          </div>
          <div className="cardMiddle" style={cardMiddleStyles}>{card.suitUnicode}</div>
          <div className="cardBottom" style={cardBottomStyles}>
            <div className="value" style={valueAlign}>{card.displayValue}</div>
            <div className="suit" style={suitAlign}>{card.suitUnicode}</div>
          </div>
        </div>
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

export default inject('store')(DragSource('card', cardSource, collect)(Card));
