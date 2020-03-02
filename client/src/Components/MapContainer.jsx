import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import { GOOGLE_TOKEN } from './googleConfig'
// import Marker from './Marker';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events || [],
      eventCords: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.convertAddress = this.convertAddress.bind(this);
    this.loadCords = this.loadCords.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);

    this.loadCords();
  }

  convertAddress(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: address}, (results, status) => {
            if (status === 'OK') {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                resolve({lat: lat, lng: lng});
            } else {
                reject(status);
            }    
        });    
    });
  };

  loadCords() {
    this.state.events.forEach(event => {
      this.convertAddress(event.address)
        .then((cords) => {
          this.setState(prevState => {
            let eventCords = Object.assign({}, prevState.eventCords);
            eventCords[event.id] = cords;              
            return { eventCords };
          })
        })
        .catch((err) => {
          console.log(err)
        });
    });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  handleJoinClick() {
    console.log("JOIN")
  }

  handleViewClick() {
    console.log("View")
  }

  onInfoWindowOpen(props, e) {
    const { selectedPlace } = this.state;
    const infoWindow = (
      <div>
        <h3>{selectedPlace.name}</h3>
        <p>Address: {selectedPlace.address}</p>
        <p>Time: {selectedPlace.time}</p>
        <p>Category: {selectedPlace.category}</p>
        <p>Summary: {selectedPlace.summary}</p>
        <button onClick={this.handleJoinClick}>JOIN</button>
        <button onClick={this.handleViewClick}>VIEW EVENT</button>
      </div>);
    ReactDOM.render(React.Children.only(infoWindow), document.getElementById("iwc"));
  }
  
  render() {
    const styles = {
      map: {
        margin:'50px',
        position: 'absolute',
        top: '50px'
      }
    }
    const { google } = this.props
    const { eventCords, activeMarker, showingInfoWindow } = this.state;
    return (
      <div className='map'>
        <Map
          style={styles.map}
          google={google}
          zoom={10}
          minZoom={2}
          maxZoom={15}
          // style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
          disableDefaultUI={true}
          onClick={this.onMapClicked}
        >
          {this.state.events.map(event => <Marker address={event.address} time={event.time} category={event.category} summary={event.summary} name={event.name} onClick={this.onMarkerClick} key={event.id} position={eventCords[event.id]}/>)}
          <InfoWindow
              marker={activeMarker}
              visible={showingInfoWindow}
              onOpen={e => {this.onInfoWindowOpen(this.props, e)}}>
              <div id="iwc">
              </div>
            </InfoWindow>
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
};

export default GoogleApiWrapper({
    apiKey: GOOGLE_TOKEN,
  })(MapContainer);
