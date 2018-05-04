import React, { Component } from 'react'
import { inject } from 'mobx-react'

class FreeCell extends Component {
  render() {
    const { store } = this.props;
    const componentStyles = {
      flex: '1',
      padding: '25px',
    };

    const textAreaStyles = {
      width: '100%',
      height: '300px',
      backgroundColor: 'lightgray',
    };

    return (
      <div className="console" style={componentStyles}>
        <div className="history">history</div>
        <textarea className="command" onChange={this.handleConsoleChange.bind(this)} style={textAreaStyles}></textarea>
        <button className="submit" onClick={() => {store.runConsoleCommands()}}>Run That Shit</button>
      </div>
    );
  }

  handleConsoleChange(e) {
    this.props.store.consoleCommand = e.target.value;
  }
}

export default inject('store')(FreeCell);
