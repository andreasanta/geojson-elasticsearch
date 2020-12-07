
import { LatLng, LatLngBounds } from 'leaflet';
import {ACTION_TYPES} from './actions'


export interface VRampState {

    // Make it indexable
    [state: string]: any;

    filterMaterial?: string
    filterSize?: string
    bounds?: LatLngBounds
    ramps?: any
    isLoadingRamps: boolean
    materials? : any
    areas? : any
}

export interface VRampBaseAction {
    type: ACTION_TYPES;
}

export interface VRampGeoDataAction
    extends VRampBaseAction {
    payload: any;
}

export interface VRampMapLoadedAction
    extends VRampBaseAction {
    center: LatLng
    bounds: LatLngBounds
}


export interface VRampBoundsChangedAction
    extends VRampBaseAction {
    bounds: LatLngBounds
}

export interface VFilterChangedAction
    extends VRampBaseAction {
    value?: string
}