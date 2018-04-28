import React, { Component } from 'react'
import { inject } from 'mobx-react';
import { DragLayer } from 'react-dnd';

import Card from './Card';

class CustomDragLayer extends Component {

	render() {
		const { isDragging, store } = this.props;
    const { initialOffset, currentOffset } = this.props;
    const { cards } = store.game.grabber;

		if (!isDragging || !initialOffset || !currentOffset) {
			return null
		}

    const offset =  {
      x: currentOffset.x,
      y: currentOffset.y,
    }

		return (
			<div>
        {cards.map((card, index) =>
          <Card key={index} card={card} rowIndex={index} dragLayerOffset={offset}/>
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
