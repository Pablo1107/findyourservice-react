import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from 'actions/authActions.js';
import styled from 'styled-components';
import LoginForm from './components/LoginForm/index.js'
import loadingSvg from 'assets/loading.svg'

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
    const { requested } = this.props;

    return (
      <FormPage className='form-page'>
        { requested ?
            <img src={loadingSvg} alt="" /> :
            <LoginForm history={this.props.history}
              loginUser={this.props.loginUser} />
        }
      </FormPage>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  requested: state.auth.requested,
});

export default connect(mapStateToProps, { loginUser })(Login);
