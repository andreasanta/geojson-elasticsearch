import React, { useEffect, FunctionComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents } from 'react-leaflet';
import { LeafletEvent, DragEndEvent, Map as LeafletMap, ResizeEvent } from 'leaflet';

import { useSelector } from '../store';
import { boundsChanged, mapLoaded } from '../store/actions';
import { useDispatch } from 'react-redux';
import FullWidthLoading from './FullWidthLoading';
import { LatLngExpression } from 'leaflet';
import { loadAllRamps } from '../apis';

interface LocalProps {
    children: any
}

const Map : FunctionComponent<LocalProps> = ({ children }) => {
    

    const dispatch = useDispatch();
    const geoData = useSelector((s) => s.ramps);
    const isLoadingData = useSelector((s) => s.isLoadingRamps)
    
    useEffect(() => {
        loadAllRamps();
    }, [])
    
    if (isLoadingData) {   
        return <FullWidthLoading />
    }

    const EventsTracker = () => {
        const map = useMapEvents({

            // Bounds updated
            resize(e : ResizeEvent) {
                dispatch(boundsChanged(map));
            },

            zoomend(e: LeafletEvent) {
                dispatch(boundsChanged(map));
            },

            moveend(e : LeafletEvent) {
                dispatch(boundsChanged(map));
            },

            dragend(e: DragEndEvent) {
                dispatch(boundsChanged(map));
            }

        })
        return null;
    }

    return (<MapContainer
                    id="v-map"
                    center={[-27.933376921777506, 153.70729284203144]}
                    zoom={10}
                    scrollWheelZoom={true}
                    whenCreated={(map) => {
                        console.log('when created');
                        dispatch(mapLoaded(map));
                    }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains='abcd'
            maxZoom={19}
        />
        {geoData?.map((d : any) => {
            let latLng : LatLngExpression = [d._source.geometry.coordinates[0][0][0][1], d._source.geometry.coordinates[0][0][0][0]]
            return (
                <>
                <Marker key={d._id} position={latLng}>
                    <Popup>
                        {d._source.asset_numb}<br/>
                        <ul>
                            <li>Material: {d._source.material}</li>
                            <li>Area: {d._source.area_}</li>
                        </ul>
                        <small>{d._source.comments}</small>
                    </Popup>
                </Marker>
                <GeoJSON key={'geo' + d._id} data={d._source.geometry}>
                </GeoJSON>
                </>)
        })}
        {children}
    <EventsTracker/>
    </MapContainer>)
}

export default Map;