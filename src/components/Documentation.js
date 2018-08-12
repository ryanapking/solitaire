import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {Controlled as CodeMirror} from 'react-codemirror2'

class Documentation extends Component {
  render() {
    const { store } = this.props;

    let classNames = ['documentation', 'overlay'];

    if (store.showDocs) classNames.push("visible");

    const exampleOptions = {
      mode: 'javascript',
      theme: 'duotone-light',
      lineNumbers: true,
    }

    return (
      <div className={classNames.join(' ')}>
        <div className="activate-tab" onClick={() => store.toggleDocs()}>DOCS</div>
        <div className="content">
          {store.levelManager.currentLevel.documentation.map((docs, index) =>
            <div className="method" key={index}>
              <h3 className="name">{docs.method}</h3>
              <p className="description">{docs.description}</p>
              <div className="params">
                {docs.params.map((param, index) =>
                  <div className="param" key={index}>
                    <p>
                      <span className="name">{param.param}: </span>
                      <span className="description">{param.description}</span>
                    </p>
                  </div>
                )}
              </div>
              <CodeMirror className="example" value={docs.example} options={exampleOptions} />
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default inject('store')(observer(Documentation));
