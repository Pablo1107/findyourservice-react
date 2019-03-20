import React, { Component } from 'react'
import Table from '../Dashboard/components/Services/components/Table/index.js'
import axios from 'axios';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map/'
import styled from 'styled-components'

const Box = styled.div`
  height: calc(100vh - 48px);
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`
const Services = styled.div`
  align-self: center;
  justify-self: center;
`

class Home extends Component {
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

    let servMarkers = [];

    if(services) {
      servMarkers = services.map((service) => {
        console.log(service);
        return {id: service.id, latlng: { lat: service.latitude, lng: service.longitude } };
      });
    }

    return (
      <Box>
        <Services>
          { services ?
            <Table services={services} match={match} /> :
            <p>There are no services.</p>
          }
        </Services>
				{ !this.props.loaded ?
					<div>Loading...</div> :
					<div>
						<Map google={this.props.google}>
              { servMarkers.map((pos) => <Marker key={pos.id} position={pos.latlng} />) }
            </Map>
					</div>
				}
      </Box>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_nx2VoioGqC2ZEOZ296tQT6jYsh_5y8M"
})(Home);
