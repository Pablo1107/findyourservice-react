import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import Navbar from '../Navbar/index.js'
import Home from '../../scenes/Home/index.js'
import Dashboard from '../../scenes/Dashboard/index.js'

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/admin" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;