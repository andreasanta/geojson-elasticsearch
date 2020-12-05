
import {ACTION_TYPES} from './actions'


export interface VRampState {
    filterMaterial?: string
    filterSize?: string
    bounds?: [Float32Array]
    ramps?: any
    isLoadingRamps: boolean
    isFilteringGraphs: boolean
}

export interface VRampBaseAction {
    type: ACTION_TYPES;
}

export interface VRampGeoDataAction
    extends VRampBaseAction {
    payload: any;
}