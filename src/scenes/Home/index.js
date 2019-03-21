import React, { Component } from 'react'
import Table from '../Dashboard/components/Services/components/Table/index.js'
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map/'
import styled from 'styled-components'
import { connect } from 'react-redux';

const Box = styled.div`
  height: calc(100vh - 48px);
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`
const Services = styled.div`
  min-width: 66%;
  align-self: center;
  justify-self: center;
`

class Home extends Component {
  componentDidMount() {
    this.props.watchLocation();
  }

  render() {
    const { match, services, authenticated } = this.props;

    let servMarkers = [];

    if(services) {
      servMarkers = services.map((service) => {
        return {id: service.id, latlng: { lat: service.latitude, lng: service.longitude } };
      });
    }

    return (
      <Box>
        <Services>
          { services ?
            <Table services={services} match={match} auth={authenticated} /> :
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

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: "AIzaSyB_nx2VoioGqC2ZEOZ296tQT6jYsh_5y8M"
})(Home));
