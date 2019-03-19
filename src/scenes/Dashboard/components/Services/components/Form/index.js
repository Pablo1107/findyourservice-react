import React, { Component } from 'react';
import FormGroup from './components/FormGroup/index.js'
import TextArea from './components/TextArea/index.js'
import validate from 'common/validate.js'
import update from 'immutability-helper';
import { GoogleApiWrapper } from 'google-maps-react';
const axios = require('axios');

class Form extends Component {
  constructor(props) {
    super(props);

    this.autocompleteInput = React.createRef();

    this.state = {
      formIsValid: false,

      formValues: {
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        latitude: 0.0,
        longitude: 0.0,
      },

      validForms: {
        title: false,
        description: false,
        address: false,
        city: false,
        state: false,
        zipcode: false,
        latitude: true,
        longitude: true,
      },

      validationRules: {
        title: {
          minLength: 3
        },
        description: {
          minLength: 10
        },
        address: {
          minLength: 5
        },
        city: {
          minLength: 3
        },
        state: {
          minLength: 3
        },
        zipcode: {
          minLength: 4
        },
        latitude: {},
        longitude: {},
      },

      formControls: {
        title: {
          placeholder: 'What is your service?',
          touched: false,
        },
        description: {
          placeholder: 'What does your service do?',
          touched: false,
        },
        address: {
          placeholder: '',
          touched: false,
        },
        city: {
          placeholder: '',
          touched: false,
        },
        state: {
          placeholder: '',
          touched: false,
        },
        zipcode: {
          placeholder: '',
          touched: false,
        },
      },

      service: null,
    }

    this.fetchService = this.fetchService.bind(this);
    this.fillFormInputs = this.fillFormInputs.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.initAutoComplete = this.initAutoComplete.bind(this);
  }

  componentDidMount() {
    const { isEditing } = this.props;

    if(isEditing) {
      this.fetchService();
    }

    this.initAutoComplete();
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
    const { formValues, validForms, validationRules, formControls } = this.state;
    const name = event.target.name;
    const value = event.target.value;

    const updatedFormElement = { ...formControls[name] };
    updatedFormElement.touched = true;

    const valid = validate(value, validationRules[name]);

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
      await axios.post('/api/services/',
        {
          ...formValues,
        });
      // console.log(response);
      updateServices();
      history.push('/admin');
    } else {
      await axios.patch(`/api/services/${match.params.id}`,
        {
          ...formValues,
        });
      // console.log(response);
      updateServices();
      history.push(`/admin/services/${match.params.id}`);
    }
  }

	initAutoComplete() {
    const { validationRules } = this.state;
    const { google } = this.props;

		this.autocomplete = new google.maps.places.Autocomplete(
			this.autocompleteInput.current,
			{types: ['geocode']}
		);
		this.autocomplete.addListener('place_changed', () => {
      // this.setState({
      //   formValues: update(formValues, {$merge: {
      //     address = '',
      //     city = '',
      //     state = '',
      //     zipcode = '',
      //     latitude = 0.0,
      //     longitude = 0.0,
      //   }}),
      //   validForms: update(validForms, {$merge: {
      //     address: false,
      //     city: false,
      //     state: false,
      //     zipcode: false,
      //   }}),
      // });
			const componentForm = {
				'administrative_area_level_1': 'state',
				'locality': 'city',
				'postal_code': 'zipcode',
			}
			const place = this.autocomplete.getPlace();
			const ac = place.address_components;

      let filledFormValues = {};
      let validFormValues = {};
      
      filledFormValues = {
        ...filledFormValues,
        address: place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };

      if(filledFormValues.address) validFormValues.address = true;

			for (let i = 0; i < ac.length; i++) {
				const addressType = ac[i].types[0];
        const key = componentForm[addressType];
				const value = ac[i]['long_name'];
        // console.log(addressType + ' ' + value);
				if(key) {
          // console.log(key + ': ' + value);
          filledFormValues = {
            ...filledFormValues,
            [key]: value,
          }
          validFormValues = {
            ...validFormValues,
            [key]: validate(value, validationRules[key]),
          }
				} else if(addressType === 'postal_code_suffix') {
          const zip = filledFormValues.zipcode;
          filledFormValues = {
            ...filledFormValues,
            zipcode: zip ? zip + value : value,
          }
				}
			}

      if(!filledFormValues.city && filledFormValues.state) {
        filledFormValues.city = filledFormValues.state;
        validFormValues.city = true;
      }

      this.setState({
        formValues: update(this.state.formValues, {$merge: {
          ...filledFormValues
        }}),
        validForms: update(this.state.validForms, {$merge: {
          ...validFormValues,
        }}),
      });
		});
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
          <FormGroup label="Address"
            ref={this.autocompleteInput}
            name="address"
            onChange={this.changeHandler}
            touched={this.state.formControls.address.touched ? 1 : 0}
            valid={1}
          />
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

export default GoogleApiWrapper({
    apiKey: "AIzaSyB_nx2VoioGqC2ZEOZ296tQT6jYsh_5y8M"
})(Form);
