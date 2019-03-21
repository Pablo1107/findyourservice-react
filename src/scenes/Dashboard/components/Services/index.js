import React, { Component } from 'react';
import Table from './components/Table/index.js'
import Service from './components/Service/index.js'
import Form from './components/Form/index.js'
import { Route, Link } from "react-router-dom";
import styled from 'styled-components';

const Main = styled.main`
  padding-top: 133px;

  @media (min-width: 768px) {
    & {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }
`

class Services extends Component {
  componentDidMount() {
    this.props.watchLocation();
  }

  render() {
    const { match, services, updateServices } = this.props;

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
          render={(props) => <Form {...props} isEditing={false} updateServices={updateServices} />}
          />
        <Route path={`${match.url}/services/:id/edit`}
          render={(props) => <Form {...props} isEditing={true} updateServices={updateServices} />}
          />
        <Route exact path={`${match.url}/services/:id`}
          render={(props) => <Service {...props} updateServices={updateServices} />}
          />
      </Main>
    );
  }
}

export default Services;
