import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './css/App.css';

import Console from './components/Console';
import CustomDragLayer from './components/CustomDragLayer';
import GameSection from './components/GameSection';
import MessageOverlay from './components/MessageOverlay';


import AppStore from './stores/AppStore'

class App extends Component {
  render() {

    const appStyles = {
      display: 'flex',
    }

    return (
      <Provider store={AppStore}>
        <div className="App">
          <div className="game" style={appStyles}>
            <CustomDragLayer />
            <GameSection />
            <Console/>
          </div>
          <div className="overlays">
            <MessageOverlay />
          </div>
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    // GameStore.autoPlay();
  }

}

export default DragDropContext(HTML5Backend)(observer(App));
