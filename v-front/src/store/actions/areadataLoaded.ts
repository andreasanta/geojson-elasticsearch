import { VRampGeoDataAction } from '../types';
import { ACTION_TYPES } from './types';


export default (geojson : any) : VRampGeoDataAction => {
    
    return {
        type: ACTION_TYPES.AREA_LOADED,
        payload: geojson.aggregations.area_ranges.buckets
    } as VRampGeoDataAction;

};


