import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Content from './components/Content/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;
