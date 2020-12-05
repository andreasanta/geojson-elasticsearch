import { createStore, applyMiddleware } from "redux";
import { createSelectorHook } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import {VRampState, VRampBaseAction, VRampGeoDataAction} from './types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ACTION_TYPES } from './actions/types';


const initialState : VRampState = {

    filterMaterial: undefined,
    filterSize: undefined,
    bounds: undefined,
    ramps: undefined,
    isLoadingRamps: true,
    isFilteringGraphs: true

}

function baseReducer(state : VRampState = initialState, action : VRampBaseAction) : VRampState {

    switch(action.type)
    {
        case ACTION_TYPES.GEODATA_LOADED:
            console.log('GEODATA LOADED');
            const ca = action as VRampGeoDataAction;
            return {...state, ramps: ca.payload, isLoadingRamps: false}         
    }

    return state;
}

export const useSelector = createSelectorHook<VRampState>();


//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(baseReducer, initialState /*, composedEnhancer */)
export default store