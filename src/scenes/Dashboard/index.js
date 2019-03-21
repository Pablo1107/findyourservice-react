import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Services from './components/Services/index.js'
import { connect } from 'react-redux';
const store = require('store')

class Dashboard extends Component {
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  componentDidUpdate(prevProps) {
    const { logout, history } = this.props;
    if((logout !== prevProps.logout) && logout) {
      history.push('/');
    }
  }

  checkIfAuthenticated() {
    const auth_token = store.get('AUTH_TOKEN');
    if(!auth_token) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { authenticated, services, watchLocation, updateServices } = this.props;

    if(!authenticated) return null;

    return (
      <div className="App" style={{ fontSize: ".875rem" }} >
        <Sidebar />
        <Services match={this.props.match}
          auth={authenticated}
          services={services}
          updateServices={updateServices}
          watchLocation={watchLocation}/>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated,
  logout: state.auth.logout,
});

export default connect(mapStateToProps)(Dashboard);
