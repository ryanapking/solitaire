import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class FreeCell extends Component {
  render() {
    const { store } = this.props;
    const componentStyles = {
      flex: '1',
      padding: '25px',
    };

    const historyStyles = {
      width: '100%',
      height: '100px',
      backgroundColor: 'lightgray',
    }

    const textAreaStyles = {
      width: '100%',
      height: '300px',
      backgroundColor: 'lightgray',
    };

    return (
      <div className="console" style={componentStyles}>
        <textarea className="history" style={historyStyles} value={store.consoleHistory} />
        <textarea className="command" onChange={this.handleConsoleChange.bind(this)} value={store.consoleCommand} style={textAreaStyles} />
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
