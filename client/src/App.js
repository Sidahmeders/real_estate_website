import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/navbar.component';
import HomePage from './components/home.component';
import AboutPage from './components/about.component';
import mapSearch from './components/mapSearch.component';


function App() {

    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" exact  component={ HomePage } />
          <Route path="/mapSearch" component={ mapSearch } />
          <Route path="/about" component={ AboutPage } />
        </div>
      </Router>
    );
}

export default App;
