import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
    return (<MapContainer id="v-map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains='abcd'
            maxZoom={19}
        />
        <Marker position={[51.505, -0.09]}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>
    </MapContainer>)
}

export default Map;