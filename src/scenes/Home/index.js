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
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    this.props.watchLocation();
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

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
            <Map google={this.props.google}
              onClick={this.onMapClicked}>
              { servMarkers.map((pos) => 
                  <Marker onClick={this.onMarkerClick}
                    service={services.find(serv => serv.id === pos.id)} key={pos.id} position={pos.latlng} />
                )
              }
              <InfoWindow
								marker={this.state.activeMarker}
								visible={this.state.showingInfoWindow}>
                { this.state.activeMarker.service ?
									<div>
										<div style={{fontWeight: '500', fontSize: '14px'}}>
                      {this.state.activeMarker.service.title}
										</div>
                    <p>{this.state.activeMarker.service.description}</p>
										<div>
											<div>{this.state.activeMarker.service.address}</div>
											<div>{this.state.activeMarker.service.zipcode}</div>
											<div>{this.state.activeMarker.service.city}</div>
											<div>{this.state.activeMarker.service.state}</div>
										</div>
                  </div> :
                  <div> </div>
                }
							</InfoWindow>
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
