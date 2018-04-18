import React, { Component } from 'react'
import { inject } from 'mobx-react'

class FreeCell extends Component {
  render() {
    const { store } = this.props;
    return (
      <div className="consoleComponent">
        <div className="consoleHistory">history</div>
        <textarea className="console" onChange={this.handleConsoleChange.bind(this)}></textarea>
        <button className="consoleButton" onClick={() => {store.runConsoleCommands()}}>Run That Shit</button>
      </div>
    )
  }

  handleConsoleChange(e) {
    this.props.store.consoleCommand = e.target.value;
  }
}

export default inject('store')(FreeCell);
