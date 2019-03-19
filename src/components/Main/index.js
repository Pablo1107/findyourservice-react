import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from '../Navbar/index.js'
import Home from '../../scenes/Home/index.js'
import Dashboard from '../../scenes/Dashboard/index.js'
import Login from '../../scenes/Login/index.js'
import { connect } from 'react-redux';
import { fetchAuthUser } from 'actions/authActions.js';

class Main extends Component {
  componentDidMount() {
    this.props.fetchAuthUser();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/admin" component={Dashboard} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchAuthUser })(Main);
