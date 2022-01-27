import React, { Component } from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 41.98, lng: 21.437802 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: 41.996387, lng: 21.437802 }} />
      )}
      {props.dealerships.map(
        (dealership) => (
          console.log(dealership),
          (<Marker position={{ lat: parseFloat(dealership.dealership_y_coordinate), lng: parseFloat(dealership.dealership_x_coordinate) }} />)
        )
      )}
    </GoogleMap>
  ))
);
export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  // 41.996387, 21.437802
  render() {
    return (
      <MyMapComponent
        isMarkerShown
        dealerships={this.props.dealerships}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
