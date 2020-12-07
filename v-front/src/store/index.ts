import { createStore, applyMiddleware } from "redux";
import { createSelectorHook } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import {
    VRampState,
    VRampBaseAction,
    VRampGeoDataAction,
    VRampBoundsChangedAction,
    VRampMapLoadedAction,
    VFilterChangedAction
} from './types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ACTION_TYPES } from './actions/types';
import { loadAllRamps, loadMaterials, loadSizes } from '../apis';


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

        case ACTION_TYPES.MATERIAL_CHANGED:
            const ca4 = action as VFilterChangedAction;

            // Deselect previous value
            if (state.filterMaterial == ca4.value)
                ca4.value = undefined;

            const newState2 = {...state, filterMaterial: ca4.value};
            loadAllRamps(newState2);
            loadSizes(newState2);
            loadMaterials(newState2);

            return newState2;

        case ACTION_TYPES.AREA_CHANGED:
            const ca5 = action as VFilterChangedAction;

            // Deselect previous value
            if (state.filterSize == ca5.value)
                ca5.value = undefined;

            const newState3 = {...state, filterSize: ca5.value};
            loadAllRamps(newState3);
            loadSizes(newState3);
            loadMaterials(newState3);

            return newState3;
    }

    return state;
}

export const useSelector = createSelectorHook<VRampState>();


//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(baseReducer, initialState /*, composedEnhancer */)
export default store