import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import api from '../api.json';
import mapStyles from '../utils/googleMapStyles.json';
const defaultMapOptions = {
    styles: mapStyles
};

export const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${api.mapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultOptions={defaultMapOptions} defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lon }}>
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lon }} />}
    </GoogleMap>
));

