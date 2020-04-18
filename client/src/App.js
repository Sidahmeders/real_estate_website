import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ContextConsumer } from './context';
// import '@fortawesome/fontawesome-free/css/all.min.css';

import NavBar from './components/navbar.component';
import HomePage from './components/home.component';
import MapSearch from './components/mapSearch.component';
import HouseUpload from './components/houseUpload.component';
import Login from './components/auth/login';
import Register from './components/auth/registerModal';
import ForgotPassword from './components/auth/forgotPassword';
import ResetPassword from './components/auth/resetPassword';
import UserDetails from './components/auth/userDetails';
import AboutPage from './components/about.component';

import { loadUser } from './reducers/actions/authAction';


function App() {

  const context = useContext(ContextConsumer);
  const {dispatchAuth, dispatchErr, auth, err} = context;
  console.log(auth, err)

  useEffect(() => {
    loadUser(dispatchAuth, dispatchErr);
  },[]);


    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={ HomePage } />
            <Route path="/mapSearch" component={ MapSearch } />
            <Route path="/houseUpload" component={ HouseUpload } />
            <Route path="/login" component={Login} />
            <Route path="/register" component={ Register } />
            <Route path="/forgotpassword" component={ ForgotPassword } />
            <Route path="/resetpassword" component={ ResetPassword } />
            <Route path="/userDetails" component={ UserDetails } />
            <Route path="/about" component={ AboutPage } />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
