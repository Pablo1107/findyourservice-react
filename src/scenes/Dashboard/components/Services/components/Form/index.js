import React, { Component } from 'react';
import FormGroup from './components/FormGroup/index.js'
import TextArea from './components/TextArea/index.js'
import validate from './validate.js'
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
            minLength: 3
          }
        },
        address: {
          placeholder: '',
          touched: false,
          validationRules: {
            minLength: 3
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
            minLength: 3
          }
        },
      },

      service: null,
    }

    this.fetchService = this.fetchService.bind(this);
    this.fillFormInputs = this.fillFormInputs.bind(this);
  }

  componentDidMount() {
    const { isEditing } = this.props;

    if(isEditing) {
      this.fetchService();
    }
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
    const { service } = this.state;

    // this.setState({ formInputs: { title: { value: service.title } }});
    this.state.formInputs.title.value = service.title;
    this.state.formInputs.title.valid = true;
    this.state.formInputs.description.value = service.description;
    this.state.formInputs.description.valid = true;
    this.state.formInputs.address.value = service.address;
    this.state.formInputs.address.valid = true;
    this.state.formInputs.city.value = service.city;
    this.state.formInputs.city.valid = true;
    this.state.formInputs.state.value = service.state;
    this.state.formInputs.state.valid = true;
    this.state.formInputs.zipcode.value = service.zipcode;
    this.state.formInputs.zipcode.valid = true;
    this.setState({ formIsValid: true });
    this.forceUpdate();

    console.log(this.state.formInputs);
    
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedInputs = {
      ...this.state.formInputs
    };
    const updatedFormElement = {
      ...updatedInputs[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedInputs[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedInputs) {
      formIsValid = updatedInputs[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formInputs: updatedInputs,
      formIsValid
    });
  }

  formSubmitHandler = (event) => {
    const { formInputs, service } = this.state;
    const { match, isEditing } = this.props;

    event.preventDefault();
    console.dir(this.state.formInputs);

    if(!isEditing) {
      axios.post('http://homestead.test/api/services/', {
          title: formInputs.title.value,
          description: formInputs.description.value,
          address: formInputs.address.value,
          city: formInputs.city.value,
          state: formInputs.state.value,
          zipcode: formInputs.zipcode.value,
          longitude: 0.0,
          latitude: 0.0
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.patch(`http://homestead.test/api/services/${match.params.id}`, {
          title: formInputs.title.value,
          description: formInputs.description.value,
          address: formInputs.address.value,
          city: formInputs.city.value,
          state: formInputs.state.value,
          zipcode: formInputs.zipcode.value,
          longitude: 0.0,
          latitude: 0.0
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    const { isEditing } = this.props;

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
