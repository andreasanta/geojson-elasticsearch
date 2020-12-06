import { VRampMapLoadedAction } from '../types';
import { ACTION_TYPES } from './types';
import { Map as LeafletMap } from 'leaflet'


export default (map : LeafletMap) : VRampMapLoadedAction => {

    console.log('center', map.getCenter());
    console.log('bounds', map.getBounds());

    return {
        type: ACTION_TYPES.MAP_LOADED,
        center: map.getCenter(),
        bounds: map.getBounds()
    } as VRampMapLoadedAction;

};


