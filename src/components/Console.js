import React, { Component } from 'react'
import { inject } from 'mobx-react'

class FreeCell extends Component {
  render() {
    const componentStyles = {
      height: '100%',
    }

    const textAreaStyles = {
      width: '100%',
      height: '100%',
      backgroundColor: 'lightgray',
    };

    const { store } = this.props;
    return (
      <div className="consoleComponent" style={componentStyles}>
        <div className="consoleHistory">history</div>
        <textarea className="console" onChange={this.handleConsoleChange.bind(this)} style={textAreaStyles}></textarea>
        <button className="consoleButton" onClick={() => {store.runConsoleCommands()}}>Run That Shit</button>
      </div>
    )
  }

  handleConsoleChange(e) {
    this.props.store.consoleCommand = e.target.value;
  }
}

export default inject('store')(FreeCell);
