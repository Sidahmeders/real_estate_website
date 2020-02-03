import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import homeImage from '../homes-img/head-home.jpg';

function Home() {

  const [userLoc, setUserLoc] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
       const userLoc = await axios.get('http://localhost:5000/userLocation');
       setUserLoc(userLoc.data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  },[])

  // console.log(userLoc);
  return(
      <div className="home-page">

        <header>
          <div className="head-img">
            <img src={homeImage} alt="home" width="100%"/>
            <h2>the Home you're looking For</h2>
          </div>
        </header>

        <ul>
          <li>{userLoc.country}</li>
          <li>{userLoc.city}</li>
          <li>{userLoc.latitude}</li>
          <li>{userLoc.longitude}</li>
        </ul>
        
      </div> 
  )
}

export default Home;
