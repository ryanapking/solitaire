import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {Controlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

class FreeCell extends Component {
  render() {
    const { store } = this.props;

    const codemirrorOptions = {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true,
    };

    return (
      <div className="console">
        <textarea className="history"value={store.consoleHistory} />
        <CodeMirror value={store.consoleCommand} options={codemirrorOptions}
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
