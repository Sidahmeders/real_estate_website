import React, { useState } from 'react';
import ReactMapGl, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/mapSearch/mapSearch.css';
import addressSvg from '../homes-img/svgs/address.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';

function MapSearch() {

  const [viewPort, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selecedHome, setSelectedHome] = useState(null);

  const [address, setAddress] = useState("");

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });

  const handleSelect =  value => {
    const result = geocodeByAddress(value);
    console.log(result)
  }

  return(
    <div className="map-search">

      <div className="map-get-coordinates">
        <PlacesAutocomplete 
        value={address} 
        onChange={setAddress} 
        onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, loading }) => (
            <div>
              {/* <p>latitude: {coordinates.latitude}</p>
              <p>longitude: {coordinates.longitude}</p> */}
             <input {...getInputProps({placeholder: "Type an Address"})} />
             <div>
               
             </div>
             {loading ? <div>laoding...</div> : null}
             {suggestions.map((suggestion) => {
             return <div>{suggestion.description}</div>
             })}
            </div>
          )}
        </PlacesAutocomplete>

      </div>

      <div className="map-chart">
      <ReactMapGl mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
       {...viewPort} onViewportChange={viewPort => { setViewPort(viewPort)}}
       mapStyle="mapbox://styles/sidahmedzoldik/ck5mq44f32cfc1ipo6fvy86ct"
       width="800px" height="450px" 
       >
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>

         <Marker
            key={"876785"}
            latitude={45.4211}
            longitude={-75.6903}
            >
              <button className="map-mark" onClick={e => {
                e.preventDefault();
                setSelectedHome("Chlef Chegga 2000_Euro_per_month")
              }}>
                <img src ={addressSvg} alt="address" width="35px"/>
              </button>
         </Marker>

         {selecedHome ? (
           <Popup      
           latitude={45.4211}
           longitude={-75.6903}
           onClose={() => {
             setSelectedHome(null)
           }}
           >
             <p>{selecedHome}</p>
           </Popup>
         ) : null}

      </ReactMapGl>
      </div>

    </div> 
  );
}

export default MapSearch;
