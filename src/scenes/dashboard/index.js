import React, { Component } from 'react';
import './index.css';
const axios = require('axios');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidebar />
        <Container />
      </div>
    );
  }
}

const Container = () =>
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

const Sidebar = () =>
  <div className="container-fluid">
    <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file"></span>
                Back to Public View
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home"></span>
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

const Navbar = () =>
  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">FindYourService</a>
    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"></input>
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <a className="nav-link" href="#">Sign out</a>
      </li>
    </ul>
  </nav>

export default App;
