import React, { Component } from 'react';
import Sidebar from './components/Sidebar/index.js'
import Services from './components/Services/index.js'
// import { connect } from 'react-redux';
// import { fetchAuthStatus } from 'actions/authActions.js';

class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.fetchAuthStatus();
  // }

  render() {
    const { match } = this.props;
    // console.log(this.props.posts);
    return (
      <div className="App">
        <Sidebar />
        <Services match={match}/>

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
