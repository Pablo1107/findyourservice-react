import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Services from './components/Services/index.js'
// import { connect } from 'react-redux';
// import { fetchAuthStatus } from 'actions/authActions.js';
const store = require('store')
const axios = require('axios');

class Dashboard extends Component {
  componentDidMount() {
    // this.props.fetchAuthStatus();

    this.getAuthToken();
  }

  getAuthToken() {
    // store.clearAll();
    const auth_token = store.get('AUTH_TOKEN');;
    if(auth_token) {
      axios.defaults.headers.common['Authorization'] = 
        `Bearer ${auth_token.token}`;
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    // console.log(this.props.posts);
    return (
      <div className="App">
        <Sidebar />
        <Services match={this.props.match}/>

      </div>
    );
  }
}

export default Dashboard;
// const mapStateToProps = state => ({
//     posts: state.user,
// });
//
// export default connect(mapStateToProps, { fetchAuthStatus })(Dashboard);
