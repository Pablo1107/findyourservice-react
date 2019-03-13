import React, { Component } from 'react';
import Table from './components/Table/index.js'
import Service from './components/Service/index.js'
import Form from './components/Form/index.js'
import { Route, Link } from "react-router-dom";
const axios = require('axios');

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
    axios.get('http://homestead.test/api/services')
      .then((response) => {
        // handle success
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
    const { match } = this.props;

    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <Link to={`${match.url}/create`}>
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Create Service
                </button>
              </Link>
            </div>
          </div>
        </div>

        { services &&
          <Table services={services} match={match} />
        }
        
        <Route path={`${match.url}/create`}
          render={(props) => <Form {...props} isEditing={false}/>}
          />
        <Route path={`${match.url}/services/:id/edit`}
          render={(props) => <Form {...props} isEditing={true}/>}
          />
        <Route exact path={`${match.url}/services/:id`} component={Service} />
      </main>
    );
  }
}

export default Services;
