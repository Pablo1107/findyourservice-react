import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Services from './components/Services/index.js'

class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="App">
        <Sidebar />
        <Services match={match}/>
      </div>
    );
  }
}

export default App;
