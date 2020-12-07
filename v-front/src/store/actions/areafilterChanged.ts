import { VFilterChangedAction } from '../types';
import { ACTION_TYPES } from './types';

export default (a? : string) : VFilterChangedAction => {

    return {
        type: ACTION_TYPES.AREA_CHANGED,
        value: a
    } as VFilterChangedAction;

};


