import React, { Component } from 'react';
import validate from 'common/validate.js'
import update from 'immutability-helper';
import styled from 'styled-components';

const FormSignIn = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
`

const FormInput = styled.input`
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;

  margin-bottom: ${ props => props.type==='email' ? '-1px' : 'auto' };
  border-bottom-right-radius: ${ props => props.type==='email' ? '0' : 'medium' };
  border-bottom-left-radius: ${ props => props.type==='email' ? '0' : 'medium' };

  margin-bottom: ${ props => props.type==='password' ? '10px' : 'auto' };
  border-top-right-radius: ${ props => props.type==='password' ? '0' : 'medium' };
  border-top-left-radius: ${ props => props.type==='password' ? '0' : 'medium' };
`

class LoginForm extends Component {
	constructor(props) {
    super(props);

    this.state = {
      formIsValid: false,
      formValues: {
        email: '',
        password: '',
      },
      validForms: {
        email: '',
        password: '',
      },
      validationRules: {
        email: {
          isEmail: true,
        },
        password: {
          minLength: 3,
        }
      }
    }

    this.checkForm = this.checkForm.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
	}

  componentDidUpdate() {
    this.checkForm();
  }

  checkForm() {
    const { validForms, formIsValid } = this.state;
    let formValid = true;

    for (const isKeyValid in validForms) {
      formValid = validForms[isKeyValid] && formValid;
    }

    if(formIsValid !== formValid) this.setState({ formIsValid: formValid });
  }

  changeHandler = event => {
    const { formValues, validForms, validationRules } = this.state;
    const name = event.target.name;
    const value = event.target.value;

    let valid = validate(value, validationRules[name]);

    this.setState({
      formValues: update(formValues, {$merge: { [name]: value }}),
      validForms: update(validForms, {$merge: { [name]: valid }}),
    });
  }

  formSubmitHandler(event) {
    const { formValues } = this.state;
    const { history } = this.props;

    event.preventDefault();

    console.log(this.props);
    this.props.loginUser(formValues.email, formValues.password);
    history.push('/admin');
  }

	render() {
		return (
      <FormSignIn className="form-signin">
        <h1 className="h2">Login</h1>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormInput type="email"
          className="form-control"
          name="email"
          value={this.state.formValues.email}
          placeholder="Email address"
          onChange={this.changeHandler}
          required autoFocus
        />
        <FormInput type="password"
          className="form-control"
          name="password"
          value={this.state.formValues.password}
          placeholder="Password"
          onChange={this.changeHandler}
          required
        />
        <button type="submit"
          className="btn btn-lg btn-primary btn-block"
          disabled={!this.state.formIsValid}
          onClick={this.formSubmitHandler}
        >
          Sign in
        </button>
      </FormSignIn>
		)
	}
}

export default LoginForm; 
