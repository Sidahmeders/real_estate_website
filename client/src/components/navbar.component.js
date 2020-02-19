import React from 'react';
import '../styles/nav.css';


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
    } else {
      isTrue = true;
      navLink.classList.remove("open");
      hiddenSpan.classList.remove("open");
      Lines.forEach(item => item.classList.remove('open'));
    }

  }


  return (
    <div>

      <nav>

        <div className="menu-lines" onClick={toggleMenu}>
          <span id="line" className="line"></span>
          <span id="line" className="line"></span>
          <span id="line" className="line"></span>
        </div>

        <span id="hidden" className="hidden-span">So<span>kn</span>aa</span>
        
        <div id="navLinks" className="nav-links">
          <div className="nav-links-items ul-items">
            <ul>
              <li><a href="ki.com">buy</a></li>
              <li><a href="ki.com">rent</a></li>
              <li><a href="ki.com">sale</a></li>
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
