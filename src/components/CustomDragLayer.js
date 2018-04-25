import React, { Component } from 'react'
import { inject } from 'mobx-react';
import { DragLayer } from 'react-dnd';

import Card from './Card';


// @DragLayer(monitor => ({
// 	item: monitor.getItem(),
// 	itemType: monitor.getItemType(),
// 	initialOffset: monitor.getInitialSourceClientOffset(),
// 	currentOffset: monitor.getSourceClientOffset(),
// 	isDragging: monitor.isDragging(),
// }))
class CustomDragLayer extends Component {

	render() {
		const { item, itemType, isDragging, store } = this.props;
    const { initialOffset, currentOffset } = this.props;

		if (!isDragging || !initialOffset || !currentOffset) {
			return null
		}

    console.log("initial offset: ", initialOffset);
    console.log("current offset: ", currentOffset);

    let { x, y } = currentOffset;

    console.log("x, y: ", x, y);

    const offsetStyles =  {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
    }

		return (
			<div styles={offsetStyles}>
        {store.game.grabber.cards.map((card, index) =>
          <Card key={index} card={card} rowIndex={index} columnCardCount={store.game.grabber.cards.length} columnType="column" dragLayer={offsetStyles}/>
        )}
			</div>
		)
	}
}

// to be sent to React DND
function collect(monitor) {
  return {
    item: monitor.getItem(),
  	itemType: monitor.getItemType(),
  	initialOffset: monitor.getInitialSourceClientOffset(),
  	currentOffset: monitor.getSourceClientOffset(),
  	isDragging: monitor.isDragging(),
  }
}

export default inject('store')(DragLayer(collect)(CustomDragLayer));
