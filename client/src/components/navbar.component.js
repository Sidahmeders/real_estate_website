import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import '../styles/navBar/nav.css';


function NavBar() {
 
  let isTrue = false;
  
  const toggleMenu = () => {

    const navLink = document.getElementById("navLinks");
    const hiddenSpan = document.getElementById("hidden");
    const Lines = [...document.querySelectorAll('#line')];
    
    if(isTrue) {
      isTrue = false ;
      navLink.classList.add("open");
      hiddenSpan.classList.add("open");
      Lines.forEach(item => item.classList.add('open'));
      document.body.classList.add('hide');
    } else {
      isTrue = true;
      navLink.classList.remove("open");
      hiddenSpan.classList.remove("open");
      Lines.forEach(item => item.classList.remove('open'));
      document.body.classList.remove('hide')
    }

  }

  const location = useLocation();
    useEffect(() => {
        toggleMenu();
    },[location.pathname]);


  return (
    <div>

      <nav>

        <div className="menu-lines" onClick={toggleMenu}>
          <span id="line" className="line"></span>
          <span id="line" className="line"></span>
          <span id="line" className="line"></span>
        </div>

        <span id="hidden" className="hidden-span">
          <a href="/">So<span>kn</span>aa</a>
        </span>
        
        <div id="navLinks" className="nav-links">
          <div className="nav-links-items ul-items">
            <ul>
              <li>
                <Link to="mapSearch">buy</Link><i className="fa fa-chevron-down"></i>
                <ul>
                  <li>Homes for Sale</li>
                  <li>Open Houses</li>
                  <li>New Homes</li>
                  <li>Recently Sold</li>
                  <li style={{borderTop:"1px solid grey"}}>See our Listing</li>
                </ul>
              </li>
              <li>
                <Link to="/about">rent</Link><i className="fa fa-chevron-down"></i>
                <ul>
                  <li>All Rentals</li>
                  <li>Apartments for Rent</li>
                  <li>Houses for Rent</li>
                  <li>Rooms for Rent</li>
                  <li style={{borderTop:"1px solid grey"}}>See our Listing</li>
                  <li>Post a Listing</li>
                </ul>
              </li>
              <li>
                <Link to="/houseUpload">sale</Link><i className="fa fa-chevron-down"></i>
                <ul>
                  <li>Sale your Proprietary</li>
                  <li>Explore your options</li> 
                  <li>Find or Be an Agent</li>
                  <li style={{borderTop:"1px solid grey"}}>Why Selling in Sokna</li>
                 
                </ul>
              </li>
            </ul>
          </div>
          <div className="nav-links-items sokna">
            <a href="/"><h2>So<span>kn</span>aa</h2></a>
          </div>
          <div className="nav-links-items signUp">
            <p><a href="/ki.com">SignUp or Login</a></p>
          </div>
        </div>   

      </nav>

    </div>
  )
}


export default NavBar;
