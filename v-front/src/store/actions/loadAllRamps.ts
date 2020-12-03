import { VRampBaseAction } from '../types';
import { ACTION_TYPES } from './types';

export default () : VRampBaseAction => {

    return {
        type: ACTION_TYPES.LOAD_ALL_RAMPS
    }

};


