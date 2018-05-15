import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-light.css'

class FreeCell extends Component {
  render() {
    const { store } = this.props;

    const consoleOptions = {
      mode: 'javascript',
      theme: 'duotone-light',
      lineNumbers: true,
    };

    const historyOptions = {
      mode: 'javascript',
      theme: 'duotone-light',
      lineNumbers: true,
    }

    return (
      <div className="console">
        {store.consoleHistory
          ? <CodeMirror className="history" value={store.consoleHistory} options={historyOptions} />
          : null
        }
        <CodeMirror className="current" value={store.consoleCommand} options={consoleOptions}
          onBeforeChange={(editor, data, value) => {
            this.handleConsoleChange(value);
          }}
        />
        <button className="submit" onClick={this.submitCommand.bind(this)}>Run That Shit</button>
      </div>
    );
  }

  handleConsoleChange(value) {
    this.props.store.consoleCommand = value;
  }

  submitCommand() {
    this.props.store.runConsoleCommands();
    this.props.store.consoleCommand = "";
  }
}

export default inject('store')(observer(FreeCell));
