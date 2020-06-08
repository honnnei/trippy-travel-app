import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUpPage from './Containers/SignUpPage';
import GlobalFeed from './Containers/GlobalFeed';
import UserProfile from './Containers/UserProfile';
import AccountSettings from './Containers/AccountSettings';
import AddTripForm from './Components/AddTripForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="app-container">
      <Router>
      <Navbar />
        <Switch>
                  <Route 
                      path='/'
                      exact 
                      component={SignUpPage}
                  />
                  <Route 
                      path='/feed'
                      exact 
                      component={GlobalFeed}

                  />
                  <Route
                      path='/profile'
                      exact 
                      component={UserProfile}
                  />
                  <Route 
                      path='/user-settings'
                      exact 
                      component={AccountSettings}

                  />
                   <Route 
                      path='/trip'
                      exact 
                      component={AddTripForm}

                  />
               </Switch>
      </Router>
    </div>
  );
}

export default App;
