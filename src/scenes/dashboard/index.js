import React, { Component } from 'react';
import './index.css';
import Navbar from '../../components/Navbar/index.js'
import Sidebar from './components/Sidebar/index.js'
import Content from './components/Content/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;
