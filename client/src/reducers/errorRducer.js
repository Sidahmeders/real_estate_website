import {
    GET_ERROR,
    CLEAR_ERROR
} from './types';


export const errState = {
    msg: null,
    status: null,
    id: null
};

export const errorReducer = (state , action) => {
    switch(action.type) {
        case GET_ERROR:
            return {
                msg: action.payload.msg.msg,
                status: action.payload.status,
                id: action.payload.id 
            };
        case CLEAR_ERROR:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
};
