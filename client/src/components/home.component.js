import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/home/home.css';


function Home() {

  const [userLoc, setUserLoc] = useState({});

  
  const fetchData = async () => {
    try {
      const userLoc = await axios.get('/userLocation');
      setUserLoc(userLoc.data);
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return(
      <div className="home-page">

        <header>
          <div className="head-img">
            <div className="head-img-text">
              <h1>the Home you're looking For</h1>
              <h2>we help you find the place you love to live in</h2>
            </div>
            <div className="head-search">
              <div className="search-bar">
                <input type="text" className="search-input" placeholder="search an address, neighborhood, or city" />
                <Link to="/mapSearch" className="search-icon">
                  <i className="fa fa-search"/>
                </Link>
              </div>
            </div>
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
