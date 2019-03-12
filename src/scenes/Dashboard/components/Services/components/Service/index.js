import React, { Component } from 'react';
const axios = require('axios');

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

  componentDidUpdate(prevProps) {
    const { service } = this.state;
    const { match } = this.props;

    if(prevProps === undefined) {
      return false;
    }

    if(service && service.id != match.params.id) {
      this.fetchService();
    }
  }

  fetchService() {
    const { match } = this.props;

    axios.get(`http://homestead.test/api/services/${match.params.id}`, { crossdomain: true })
      .then((response) => {
        // handle success
        // console.log(response);
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

export default Service;
