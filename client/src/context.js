import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { authState, authReducer } from './reducers/authReducer';
import { errState, errorReducer } from './reducers/errorRducer';

const Context = React.createContext();


function ContextProvider(props) {

    const [auth, dispatchAuth] = useReducer( authReducer, authState);
    const [err, dispatchErr] = useReducer(errorReducer, errState);

    const [houses, setHouses] = useState({});

    useEffect(() => {
        let mounted = false;
        if(!mounted) {
            const fetchData = async () => {
                const response = await axios.get('http://localhost:5000/uploads', {
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
            fetchData();
        }
        return () => mounted = true;
    },[]);

    return (
        <Context.Provider value={{
            houses,
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
