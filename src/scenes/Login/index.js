import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from 'actions/authActions.js';
import styled from 'styled-components';
import LoginForm from './components/LoginForm/index.js'

const FormPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

class Login extends Component {
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  componentDidUpdate(prevProps) {
    if(this.props.authenticated !== prevProps.authenticated) {
      this.checkIfAuthenticated();
    }
  }

  checkIfAuthenticated() {
    if(this.props.authenticated) {
      this.props.history.push('/admin');
    }
  }

  render() {
    return (
      <FormPage className='form-page'>
        <LoginForm history={this.props.history}
          loginUser={this.props.loginUser} />
      </FormPage>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
