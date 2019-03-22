import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Navbar from '../Navbar/index.js'
import Home from '../../scenes/Home/index.js'
import Dashboard from '../../scenes/Dashboard/index.js'
import Login from '../../scenes/Login/index.js'
import { connect } from 'react-redux';
import { fetchAuthUser } from 'actions/authActions.js';
import axios from 'axios';
import queryString from 'query-string';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      services: null,
      userLocation: {},
      radius: 0,
    }

    this.queryStringToState = this.queryStringToState.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.stateToQueryString = this.stateToQueryString.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.watchLocation= this.watchLocation.bind(this);
    this.fetchServices = this.fetchServices.bind(this);
    this.fetchIfNewState = this.fetchIfNewState.bind(this);
  }

  componentDidMount() {
    this.props.fetchAuthUser();
    this.queryStringToState();
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchIfNewState(prevState);
  }

  queryStringToState() {
    const { location } = this.props;

    let values = queryString.parse(location.search);
    // console.log(values);

    this.setState({
      search: values.search ? values.search : '',
    });

    this.fetchServices(values.search);
  }

  fetchIfNewState(prevState) {
    const newLoc = this.state.userLocation; const oldLoc = prevState.userLocation;
    const newRadius = this.state.radius; const oldRadius = prevState.radius;

    if((oldLoc.lat !== newLoc.lng && oldLoc.lng !== newLoc.lng) ||
      oldRadius !== newRadius) {
      this.fetchServices(this.state.search);
    }
  }

  stateToQueryString() {
    const { location, history } = this.props;

    const stateToQuery = { search: this.state.search };

    const queryStringFromState = queryString.stringify(stateToQuery);
    location.search = `?${queryStringFromState}`;
    history.replace(`/${location.search}`);
  }

  searchChangeHandler(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: key === 'radius' ? parseInt(value) : value,
    });
  }

  onSearch(event) {
    const { search } = this.state;

    event.preventDefault();

    // console.log("onSearch: " + search);

    this.fetchServices(search);
    this.stateToQueryString();
  }

  watchLocation() {
    this.watcher = navigator.geolocation.watchPosition((position) => {
      // console.log(position);
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
      //var circle = new google.maps.Circle({
      //  center: geolocation,
      //  radius: position.coords.accuracy
      //});
      //autocomplete.setBounds(circle.getBounds());
    });
  }

  async fetchServices(query) {
    const { userLocation, radius } = this.state;

    try {
      let url = `/api/services?`;
      if(query) url += `search=${query}&`;
      if(Object.keys(userLocation).length !== 0) url += `lat=${userLocation.lat}&lng=${userLocation.lng}&`;
      if(radius !== 0) url += `radius=${radius}`;
      
      const response = await axios.get(url);
      this.setState({ services: response.data });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar changeHandler={this.searchChangeHandler}
          search={this.state.search}
          onSearch={this.onSearch}
          userLocation={this.state.userLocation} />
        <Switch>
          <Route path="/" exact render={(props) =>
              <Home {...props} services={this.state.services}
                watchLocation={this.watchLocation}/>
          }/>
          <Route path="/admin" render={(props) =>
              <Dashboard{...props} services={this.state.services}
                watchLocation={this.watchLocation}
                updateServices={this.fetchServices} />
          }/>
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchAuthUser })(Main));
