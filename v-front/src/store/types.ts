
import {ACTION_TYPES} from './actions'

export interface VRampState {
    filterMaterial?: string;
    filterSize?: string;
    bounds?: [Float32Array];
}

export interface VRampBaseAction {
    type: ACTION_TYPES;
}