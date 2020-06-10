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
    <div className="App">
      <Router>
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

<<<<<<< HEAD
                  />
                  <Route
                      path='/profile'
                      exact 
                      component={UserProfile}
                  />
                  <Route 
                      path='/settings'
                      exact 
                      component={AccountSettings}
=======
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
>>>>>>> origin/dev-new

            />
            <Route
              path='/trip'
              exact
              component={AddTripForm}

            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;