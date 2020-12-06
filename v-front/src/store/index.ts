import { createStore, applyMiddleware } from "redux";
import { createSelectorHook } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import {VRampState, VRampBaseAction, VRampGeoDataAction, VRampBoundsChangedAction, VRampMapLoadedAction} from './types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ACTION_TYPES } from './actions/types';
import { loadAll } from './reactions';
import { loadMaterials, loadSizes } from '../apis';


const initialState : VRampState = {

    filterMaterial: undefined,
    filterSize: undefined,
    bounds: undefined,
    ramps: undefined,
    isLoadingRamps: true,
    materials: undefined,
    areas: undefined
}

function baseReducer(state : VRampState = initialState, action : VRampBaseAction) : VRampState {

    switch(action.type)
    {
        case ACTION_TYPES.MAP_LOADED:
            const la : VRampMapLoadedAction = action as VRampMapLoadedAction;
            const newState = {...state, bounds: la.bounds};
            
            loadMaterials(newState);
            loadSizes(newState);
            
            return newState;

        case ACTION_TYPES.BOUNDS_CHANGED:
            const bc = action as VRampBoundsChangedAction;
            setTimeout(() => {
                loadMaterials();
                loadSizes();
            }, 250);
            return {...state, bounds: bc.bounds, areas:undefined, materials:undefined};

        case ACTION_TYPES.GEODATA_LOADED:
            const ca1 = action as VRampGeoDataAction;
            return {...state, ramps: ca1.payload, isLoadingRamps: false}
            
        case ACTION_TYPES.MATERIAL_LOADED:
            const ca2 = action as VRampGeoDataAction;
            return {...state, materials: ca2.payload}

        case ACTION_TYPES.AREA_LOADED:
            const ca3 = action as VRampGeoDataAction;
            return {...state, areas: ca3.payload}
    }

    return state;
}

export const useSelector = createSelectorHook<VRampState>();


//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(baseReducer, initialState /*, composedEnhancer */)
export default store