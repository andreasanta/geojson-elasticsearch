import { VRampGeoDataAction } from '../types';
import { ACTION_TYPES } from './types';


export default (geojson : any) : VRampGeoDataAction => {

    // Shorten down one of the buckets, it's too long to display
    const buckets = geojson.aggregations.materials.buckets.map((d : any) => {
        if (d.key === 'Interlock Conc Block')
            d.key = 'Int. CB.';
        
        return d;
    });

    return {
        type: ACTION_TYPES.MATERIAL_LOADED,
        payload: buckets
    } as VRampGeoDataAction;

};


