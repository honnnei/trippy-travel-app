import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUpPage from './Containers/SignUpPage';
import GlobalFeed from './Containers/GlobalFeed';
import UserProfile from './Containers/UserProfile';
import AccountSettings from './Containers/AccountSettings';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
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
               </Switch>
      </Router>
    </div>
  );
}

export default App;
