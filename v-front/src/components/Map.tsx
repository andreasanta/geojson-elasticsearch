import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

import { loadAllRamps } from '../apis'
import { useSelector } from '../store';
import FullWidthLoading from './FullWidthLoading';
import { LatLngExpression, LatLngTuple } from 'leaflet';

const Map = () => {
    
    useEffect( () => {
        loadAllRamps();
    }, []);

    const geoData = useSelector((s) => s.ramps);
    const isLoadingData = useSelector((s) => s.isLoadingRamps)
    if (isLoadingData) {   
        return <FullWidthLoading />
    }

    return (<MapContainer id="v-map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains='abcd'
            maxZoom={19}
        />
        {geoData?.map((d : any) => {
            console.log(d, 'singledata');
            let latLng : LatLngExpression = [d._source.geometry.coordinates[0][0][0][1], d._source.geometry.coordinates[0][0][0][0]]
            console.log(latLng, 'latLng');
            return (
                <>
                <Marker key={d._id} position={latLng}>
                    <Popup>
                        {d._source.asset_numb}<br/>
                        <ul>
                            <li>Material: {d._source.material}</li>
                            <li>Shape: {d._source.shape_area}</li>
                        </ul>
                        <small>{d._source.comments}</small>
                    </Popup>
                </Marker>
                <GeoJSON data={d._source.geometry}>
                </GeoJSON>
                </>)
        })}
    </MapContainer>)
}

export default Map;