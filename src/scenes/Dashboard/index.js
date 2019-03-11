import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Services from './components/Services/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Services />
      </div>
    );
  }
}

export default App;
