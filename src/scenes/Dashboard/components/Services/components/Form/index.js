import React, { Component } from 'react';
import FormGroup from './components/FormGroup/index.js'
import TextArea from './components/TextArea/index.js'
import validate from './validate.js'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formIsValid: false,

      formInputs: {
        title: {
          value: '',
          placeholder: 'What is your name',
          valid: false,
          touched: false,
          validationRules: {
            minLength: 3
          }
        },
        description: {
          value: '',
        },
        // address: {
        //   value: '',
        // },
        city: {
          value: '',
        },
        state: {
          value: '',
        },
        zipcode: {
          value: '',
        },
      }
    }
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
    event.preventDefault();

    console.dir(this.state.formInputs);
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Create Service</h1>
        </div>
        <form>
          <FormGroup label="Title"
            name="title"
            placeholder={this.state.formInputs.title.placeholder}
            value={this.state.formInputs.title.value}
            onChange={this.changeHandler}
            touched={this.state.formInputs.title.touched}
            valid={this.state.formInputs.title.valid}
          />
          <TextArea label="Description"
            name="description"
            placeholder={this.state.formInputs.description.placeholder}
            value={this.state.formInputs.description.value}
            onChange={this.changeHandler}
            touched={this.state.formInputs.description.touched}
            valid={this.state.formInputs.description.valid}
          />
          <div className="form-group">
            <label className="label">Address</label>
            <input type="text" ref="autocomplete"
              className="form-control"
              ></input>
            <input type="hidden" name="address"></input>
            <div className="invalid-feedback"></div>
          </div>
          <FormGroup label="City"
            name="city"
            placeholder={this.state.formInputs.city.placeholder}
            value={this.state.formInputs.city.value}
            onChange={this.changeHandler}
            touched={this.state.formInputs.city.touched}
            valid={this.state.formInputs.city.valid}
          />
          <FormGroup label="State"
            name="state"
            placeholder={this.state.formInputs.state.placeholder}
            value={this.state.formInputs.state.value}
            onChange={this.changeHandler}
            touched={this.state.formInputs.state.touched}
            valid={this.state.formInputs.state.valid}
            />
          <FormGroup label="Zip Code"
            name="zipcode"
            placeholder={this.state.formInputs.zipcode.placeholder}
            value={this.state.formInputs.zipcode.value}
            onChange={this.changeHandler}
            touched={this.state.formInputs.zipcode.touched}
            valid={this.state.formInputs.zipcode.valid}
            />
          <input type="hidden" name="latitude" value=""></input>
          <input type="hidden" name="longitude" value=""></input>
          <button className="btn btn-primary" onClick={this.formSubmitHandler}
            disabled={!this.state.formIsValid}>
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
