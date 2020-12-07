import { VFilterChangedAction } from '../types';
import { ACTION_TYPES } from './types';

export default (m? : string) : VFilterChangedAction => {

    return {
        type: ACTION_TYPES.MATERIAL_CHANGED,
        value: m
    } as VFilterChangedAction;

};


