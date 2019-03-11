import React, { Component } from 'react';
const axios = require('axios');

const Content = () =>
  <div>
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <Services /> 
    </main>
  </div>

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: null,
    }

    this.fetchServices = this.fetchServices.bind(this);
  }

  componentDidMount() {
    this.fetchServices();
  }

  fetchServices() {
    axios.get('http://homestead.test/api/services', { crossdomain: true })
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({ services: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    const { services } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          {/* <div className="btn-toolbar mb-2 mb-md-0"> */}
          {/*   <div className="btn-group mr-2"> */}
          {/*     <button type="button" className="btn btn-sm btn-outline-secondary">Share</button> */}
          {/*     <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
          {/*   </div> */}
          {/*   <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle"> */}
          {/*     <span data-feather="calendar"></span> */}
          {/*     This week */}
          {/*   </button> */}
          {/* </div> */}
        </div>

        { services &&
          <Table services={services} />
        }

        <Service />
      </div>
    );
  }
}

const Table = ({ services }) =>
  <div>
    <h2>Services</h2>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {services.map(item =>
            <tr key={item.id}>
              <td>
                <a href={'/services/' + item.id}>{item.id}</a> 
              </td>
              <td>
                <a href={'/services/' + item.id}>{item.title}</a>
              </td>
              <td>
                <a href={'/services/' + item.id}>{item.city}</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

class Service extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: null,
    }

    this.fetchService = this.fetchService.bind(this);
  }

  componentDidMount() {
    this.fetchService();
  }

  fetchService() {
    axios.get('http://homestead.test/api/services/1', { crossdomain: true })
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({ service: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    const { service } = this.state;

    if(!service) return null;

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{ service.title }</h1>
          {/* <div className="btn-toolbar mb-2 mb-md-0"> */}
          {/*   <div className="btn-group mr-2"> */}
          {/*     <form :action="'#/services/' + service.id + '/edit'"> */}
          {/*       <input type="submit" className="btn btn-sm btn-outline-secondary" value="Edit"> */}
          {/*     </form>  */}
          {/*     <form @submit.prevent="$emit('delete', service.id)"> */}
          {/*       <input type="submit" className="btn btn-danger btn-sm btn-outline-secondary" value="Delete"> */}
          {/*     </form>  */}
          {/*   </div>  */}
          {/* </div> */}
        </div>
        <h1 className="h3">Description</h1>
        <p>{ service.description }</p> 
        <h1 className="h3">Address</h1>
        { service.address }
        <h1 className="h3">City</h1>
        { service.city }
        <h1 className="h3">State</h1>
        { service.state }
        <h1 className="h3">Zipcode</h1>
        { service.zipcode }
        <h1 className="h3">Longitude</h1>
        { service.longitude }
        <h1 className="h3">Latitude</h1>
        { service.latitude }
      </div>
    );
  }
}

export default Content;
