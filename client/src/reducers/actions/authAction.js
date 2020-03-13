import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_EOROR,
    LOGIN_SUCCESS,
    PASSWORD_RESET_FAIL,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    EMAIL_CHECKOUT_SUCCESS,
    REGISTER_FAIL,
    EMAIL_CHECKOUT_FAIL
} from '../types';
import { returnErr } from './errAction';


export const loadUser = (dispatchAuth, dispatchErr, token) => {
    dispatchAuth({ type: USER_LOADING });

    axios.get('http://localhost:5000/users/auth/user', token)
    .then(res => {
        dispatchAuth({
            type: USER_LOADED,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response === undefined) {
            console.log(err);
        } else {
            dispatchErr(returnErr(err.response.data, err.response.status));
            dispatchAuth({
                type: AUTH_EOROR
            });
        }
    });
};

export const registerUser = ({ name, phoneNumber, email, password, password2, userType }, dispatchAuth, dispatchErr) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, phoneNumber, email, password, password2, userType });

    axios.post('http://localhost:5000/users/register', body, config)
    .then(res => dispatchAuth({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatchErr(returnErr(err.response.data, err.response.status));
        dispatchAuth({ type: REGISTER_FAIL });
    });
};

export const loginUser = ({email, password}, dispatchAuth, dispatchErr) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});

    axios.post('http://localhost:5000/users/auth', body, config)
    .then(res => dispatchAuth({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatchErr(returnErr(err.response.data, err.response.data));
        dispatchAuth({ type: LOGIN_FAIL });
    });
};

export const emailCheckout = (dispatchAuth, dispatchErr, email) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });
    axios.post('http://localhost:5000/users/forgotpassword', body, config)
    .then(res => dispatchAuth({
        type: EMAIL_CHECKOUT_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatchErr(returnErr(err.response.data, err.response.status));
        dispatchAuth({ type: EMAIL_CHECKOUT_FAIL });
    });
};

export const passwordReset = (dispatchAuth , dispatchErr, pathName, {password, password2}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ password, password2 });

    axios.post(`http://localhost:5000/users/${pathName}`, body, config)
    .then(res => console.log(res))
    .catch(err => {
        if(err.response === undefined) {
            console.log(err);
        } else {
            dispatchErr(returnErr(err.response.data, err.response.status));
            dispatchAuth({ type: PASSWORD_RESET_FAIL });
        }
    });
};

export const tokenConfig = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};
