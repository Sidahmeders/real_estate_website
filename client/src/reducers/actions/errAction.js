import { GET_ERROR, CLEAR_ERROR } from '../types';

export const returnErr = (msg, status, id = null) => {
    return {
        type: GET_ERROR,
        payload: {msg, status, id}
    }
};

export const clearErr = () => {
    return {
        type: CLEAR_ERROR
    }
};
