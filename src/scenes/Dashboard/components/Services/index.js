import React, { Component } from 'react';
import Table from './components/Table/index.js'
import Service from './components/Service/index.js'
import Form from './components/Form/index.js'
import { Route, Link } from "react-router-dom";
import styled from 'styled-components';
const axios = require('axios');

const Main = styled.main`
  padding-top: 133px;

  @media (min-width: 768px) {
    & {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }
`

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

  async fetchServices() {
    try {
      const response = await axios.get('http://homestead.test/api/services');
      this.setState({ services: response.data });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { services } = this.state;
    const { match } = this.props;

    return (
      <Main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
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
          render={(props) => <Form {...props} isEditing={false} updateServices={this.fetchServices} />}
          />
        <Route path={`${match.url}/services/:id/edit`}
          render={(props) => <Form {...props} isEditing={true} updateServices={this.fetchServices} />}
          />
        <Route exact path={`${match.url}/services/:id`}
          render={(props) => <Service {...props} updateServices={this.fetchServices} />}
          />
      </Main>
    );
  }
}

export default Services;
