import React, { Component } from 'react';
import FormGroup from './components/FormGroup/index.js'
import TextArea from './components/TextArea/index.js'
import validate from 'common/validate.js'
import update from 'immutability-helper';
const axios = require('axios');

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formIsValid: false,

      formValues: {
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
      },

      validForms: {
        title: false,
        description: false,
        address: false,
        city: false,
        state: false,
        zipcode: false,
      },

      formControls: {
        title: {
          placeholder: 'What is your service?',
          touched: false,
          validationRules: {
            minLength: 3
          }
        },
        description: {
          placeholder: 'What does your service do?',
          touched: false,
          validationRules: {
            minLength: 10
          }
        },
        address: {
          placeholder: '',
          touched: false,
          validationRules: {
            minLength: 5
          }
        },
        city: {
          placeholder: '',
          touched: false,
          validationRules: {
            minLength: 3
          }
        },
        state: {
          placeholder: '',
          touched: false,
          validationRules: {
            minLength: 3
          }
        },
        zipcode: {
          placeholder: '',
          valid: false,
          touched: false,
          validationRules: {
            minLength: 4
          }
        },
      },

      service: null,
    }

    this.fetchService = this.fetchService.bind(this);
    this.fillFormInputs = this.fillFormInputs.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  componentDidMount() {
    const { isEditing } = this.props;

    if(isEditing) {
      this.fetchService();
    }
  }

  componentDidUpdate() {
    this.checkForm();
  }

  async fetchService() {
    const { match } = this.props;

    try {
      const response = await axios.get(`http://homestead.test/api/services/${match.params.id}`);
      this.setState({ service: response.data });
      this.fillFormInputs();
    } catch(error) {
      console.log(error);
    }
  }

  fillFormInputs() {
    const { service, formValues } = this.state;

    for(const name in formValues) {
      console.log(name + " " + service[name]);
      this.setState({
        formValues: update(
          this.state.formValues, {$merge: { [name]: service[name] }}
        ),
        validForms: update(
          this.state.validForms, {$merge: { [name]: true }}
        ),
        formIsValid: true
      });
    }

    console.log(this.state.formValues);

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
    const { formValues, validForms, formControls } = this.state;
    const name = event.target.name;
    const value = event.target.value;

    const updatedFormElement = { ...formControls[name] };
    updatedFormElement.touched = true;

    let valid = validate(value, updatedFormElement.validationRules);

    this.setState({
      formValues: update(formValues, {$merge: { [name]: value }}),
      validForms: update(validForms, {$merge: { [name]: valid }}),
      formControls: update(formControls, {$merge: { [name]: updatedFormElement }}),
    });
  }

  async formSubmitHandler(event) {
    const { formValues } = this.state;
    const { match, isEditing, history, updateServices } = this.props;

    event.preventDefault();

    if(!isEditing) {
      const response = await axios.post('http://homestead.test/api/services/',
        {
          ...formValues,
          longitude: 0.0,
          latitude: 0.0
        });
      console.log(response);
      updateServices();
      history.push('/admin');
    } else {
      const response = await axios.patch(`http://homestead.test/api/services/${match.params.id}`,
        {
          ...formValues,
          longitude: 0.0,
          latitude: 0.0
        });
      console.log(response);
      updateServices();
      history.push(`/admin/services/${match.params.id}`);
    }
  }

  render() {
    const { isEditing } = this.props;
    const { service } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          { isEditing ?
              <h1 className="h2">Edit Service</h1> :
              <h1 className="h2">Create Service</h1>
          }
        </div>
        { (service || !isEditing) &&
        <form>
          <FormGroup label="Title"
            name="title"
            placeholder={this.state.formControls.title.placeholder}
            value={this.state.formValues.title}
            onChange={this.changeHandler}
            touched={this.state.formControls.title.touched ? 1 : 0}
            valid={this.state.validForms.title ? 1 : 0}
          />
          <TextArea label="Description"
            name="description"
            placeholder={this.state.formControls.description.placeholder}
            value={this.state.formValues.description}
            onChange={this.changeHandler}
            touched={this.state.formControls.description.touched ? 1 : 0}
            valid={this.state.formControls.description.valid ? 1 : 0}
          />
          <div className="form-group">
            <label className="label">Address</label>
            <input type="text"
              className="form-control"
              name="address"
              value={this.state.formValues.address}
              onChange={this.changeHandler}
              // TODO: Make a component for this to validate input.
              ></input>
            <input type="hidden" name="address"></input>
            <div className="invalid-feedback"></div>
          </div>
          <FormGroup label="City"
            name="city"
            placeholder={this.state.formControls.city.placeholder}
            value={this.state.formValues.city}
            onChange={this.changeHandler}
            touched={this.state.formControls.city.touched ? 1 : 0}
            valid={this.state.validForms.city ? 1 : 0}
          />
          <FormGroup label="State"
            name="state"
            placeholder={this.state.formControls.state.placeholder}
            value={this.state.formValues.state}
            onChange={this.changeHandler}
            touched={this.state.formControls.state.touched ? 1 : 0}
            valid={this.state.validForms.state ? 1 : 0}
          />
          <FormGroup label="Zip Code"
            name="zipcode"
            placeholder={this.state.formControls.zipcode.placeholder}
            value={this.state.formValues.zipcode}
            onChange={this.changeHandler}
            touched={this.state.formControls.zipcode.touched ? 1 : 0}
            valid={this.state.validForms.zipcode ? 1 : 0}
          />
          <input type="hidden"
            name="latitude"
            ></input>
          <input type="hidden"
            name="longitude"
            ></input>
          <button className="btn btn-primary" onClick={this.formSubmitHandler}
            disabled={!this.state.formIsValid}>
            { isEditing ? "Edit" : "Create" }
          </button>
        </form>
        }
      </div>
    );
  }
}

export default Form;
