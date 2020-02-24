import React, { useState, useEffect } from 'react';
import axios from 'axios';


const HousesContext = React.createContext();

function HousesProvider(props) {

    const [houses, setHouses] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/uploads');
            setHouses(() => response.data);
        }

        fetchData();
    },[]);

    return (
        <HousesContext.Provider value={{
            houses
        }}>
            {props.children}
        </HousesContext.Provider>
    );
}

const HousesConsumer = HousesContext;

export { HousesProvider, HousesConsumer }
