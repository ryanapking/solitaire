import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class MessageOverlay extends Component {
  render() {
    const { store } = this.props;
    
    let classNames = ['messageOverlay'];

    if (store.showDocs) classNames.push("visible");

    return (
      <div className={classNames.join(' ')}>
        <div className="activate-tab" onClick={() => this.handleClick()}>hi there</div>
        <div className="content">Content</div>
      </div>
    );
  }

  handleClick(value) {
    this.props.store.showDocs = !this.props.store.showDocs;
  }

}

export default inject('store')(observer(MessageOverlay));
