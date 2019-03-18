import React, { Component } from 'react';
import './index.css';
import validate from 'common/validate.js'
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { loginUser } from 'actions/authActions.js';

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
      <div className='form-page'>
        <LoginForm history={this.props.history}
          loginUser={this.props.loginUser} />
      </div>
    );
  }
}

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
      <form className="form-signin">
        <h1 className="h2">Login</h1>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input type="email"
          className="form-control"
          name="email"
          value={this.state.formValues.email}
          placeholder="Email address"
          onChange={this.changeHandler}
          required autoFocus
        />
        <input type="password"
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
      </form>
		)
	}

}

// export default Login;
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
