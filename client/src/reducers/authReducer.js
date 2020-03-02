import {
    USER_LOADING,
    USER_LOADED,
    AUTH_EOROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';


export const authState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    isLoading: false,
    user: null
};

export const authReducer = (state, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...authState,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...authState,
                isAuth: true,
                isLoading: true,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...authState,
                ...action.payload,
                isAuth: true,
                isLoading: false
            };
        case AUTH_EOROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...authState,
                token: null,
                user: null,
                isAuth: false,
                isLoading: false
            };
        default:
            return state;
    }
};
