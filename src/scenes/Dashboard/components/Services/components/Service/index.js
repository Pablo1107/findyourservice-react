import React, { Component } from 'react';
import { Link } from "react-router-dom";
const axios = require('axios');

class Service extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: null,
    }

    this.fetchService = this.fetchService.bind(this);
    this.onDeleteService = this.onDeleteService.bind(this);
  }

  componentDidMount() {
    this.fetchService();
  }

  componentDidUpdate(prevProps) {
    const { service } = this.state;
    const { match } = this.props;

    if(prevProps === undefined) {
      return false;
    }

    if(service && service.id.toString() !== match.params.id) {
      this.fetchService();
    }
  }

  async fetchService() {
    const { match } = this.props;

    try {
      const response = await axios.get(`http://homestead.test/api/services/${match.params.id}`);
      this.setState({ service: response.data });
    } catch(errors) {
      console.log(errors);
    }

  }

  async onDeleteService() {
    const { match, history, updateServices } = this.props;

    try {
      await axios.delete(
        `http://homestead.test/api/services/${match.params.id}`);
      updateServices();
      history.push('/admin');
    } catch(errors) {
      console.log(errors);
    }

  }

  render() {
    const { service } = this.state;
    const { match } = this.props;

    if(!service) return null;

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{ service.title }</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <Link to={`${match.url}/edit`}>
                <button type="submit"
                  className="btn btn-sm btn-outline-secondary">Edit</button>
              </Link>
              <button type="submit"
                className="btn btn-danger btn-sm"
                onClick={this.onDeleteService}>
                Delete
              </button>
            </div> 
          </div>
        </div>
        <h1 className="h3">Description</h1>
        <p>{ service.description }</p> 
        <h1 className="h3">Address</h1>
        <p>{ service.address }</p>
        <h1 className="h3">City</h1>
        <p>{ service.city }</p>
        <h1 className="h3">State</h1>
        <p>{ service.state }</p>
        <h1 className="h3">Zipcode</h1>
        <p>{ service.zipcode }</p>
        <h1 className="h3">Longitude</h1>
        <p>{ service.longitude }</p>
        <h1 className="h3">Latitude</h1>
        <p>{ service.latitude }</p>
      </div>
    );
  }
}

export default Service;
