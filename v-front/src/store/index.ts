import { createStore, combineReducers, Reducer, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {VRampState, VRampBaseAction} from './types';
import { composeWithDevTools } from 'redux-devtools-extension'


const initialState : VRampState = {
    filterMaterial: undefined,
    filterSize: undefined,
    bounds: undefined
}

function baseReducer(state : VRampState = initialState, action : VRampBaseAction) : VRampState {

    switch(action)
    {
        default:
            return state;
    }

}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const rootReducer: Reducer<VRampState> = combineReducers<VRampState, VRampBaseAction>({
    main: baseReducer
} as any);




const store = createStore(rootReducer, initialState)
export default store