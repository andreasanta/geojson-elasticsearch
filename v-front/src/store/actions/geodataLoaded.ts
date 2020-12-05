import { VRampGeoDataAction } from '../types';
import { ACTION_TYPES } from './types';


export default (geojson : any) : VRampGeoDataAction => {
    
    return {
        type: ACTION_TYPES.GEODATA_LOADED,
        payload: geojson.hits.hits
    } as VRampGeoDataAction;

};


