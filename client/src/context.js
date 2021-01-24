import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authState, authReducer } from './reducers/authReducer';
import { errState, errorReducer } from './reducers/errorRducer';

const Context = React.createContext();


function ContextProvider(props) {

    const [auth, dispatchAuth] = useReducer( authReducer, authState);
    const [err, dispatchErr] = useReducer(errorReducer, errState);

    const [houses, setHouses] = useState({});

    const fetchData = async () => {
        const response = await axios.get('/uploads', {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        try {
            setHouses(() => response.data);
        } catch(err) {
            if(err) console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Context.Provider value={{
            houses,
            fetchData,
            auth,
            dispatchAuth,
            err,
            dispatchErr
        }}>
            {props.children}
        </Context.Provider>
    );
}

const ContextConsumer = Context;

export { ContextProvider, ContextConsumer }
