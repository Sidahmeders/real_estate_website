import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/navbar.component';
import HomePage from './components/home.component';
import MapSearch from './components/mapSearch.component';
import HouseUpload from './components/houseUpload.component';
import AboutPage from './components/about.component';

function App() {

    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact  component={ HomePage } />
            <Route path="/mapSearch" component={ MapSearch } />
            <Route path="/houseUpload" component={ HouseUpload } />
            <Route path="/about" component={ AboutPage } />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
