import { VRampBoundsChangedAction } from '../types';
import { ACTION_TYPES } from './types';
import { Map as LeafletMap } from 'leaflet'


export default (map : LeafletMap) : VRampBoundsChangedAction => {

    console.log('center', map.getCenter());
    console.log('bounds', map.getBounds());

    return {
        type: ACTION_TYPES.BOUNDS_CHANGED,
        bounds: map.getBounds()
    } as VRampBoundsChangedAction;

};


