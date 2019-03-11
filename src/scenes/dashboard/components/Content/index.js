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
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.city}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

export default Content;
