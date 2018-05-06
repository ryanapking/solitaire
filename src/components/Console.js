import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class FreeCell extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className="console">
        <textarea className="history"value={store.consoleHistory} />
        <textarea className="command" onChange={this.handleConsoleChange.bind(this)} value={store.consoleCommand} />
        <button className="submit" onClick={this.submitCommand.bind(this)}>Run That Shit</button>
      </div>
    );
  }

  handleConsoleChange(e) {
    this.props.store.consoleCommand = e.target.value;
  }

  submitCommand() {
    this.props.store.runConsoleCommands();
    this.props.store.consoleCommand = "";
  }
}

export default inject('store')(observer(FreeCell));
