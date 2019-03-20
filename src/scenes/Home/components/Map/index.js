import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);

		this.loadMap = this.loadMap.bind(this);
		this.renderChildren = this.renderChildren.bind(this);
  }

	componentDidMount() {
    this.loadMap();
  }

  loadMap() {
		if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

			const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

			let zoom = 14;
      let lat = -34.58;
      let lng = -58.44;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        // mapCenter: this.state.currentLocation
      });
    })
  }

  render() {
    return (
			<div ref='map' style={{width: '100%', height: '100%'}}>
        Loading map...
        {this.renderChildren()}
      </div>
    );
  }
}

export default Map;
