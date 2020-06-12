import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from './Containers/SignUpPage';
import GlobalFeed from './Containers/GlobalFeed';
import UserProfile from './Containers/UserProfile';
import OtherUserProfile from './Containers/OtherUserProfile';
import AccountSettings from './Containers/AccountSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


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
                      path='/settings'
                      exact 
                      component={AccountSettings}

                  />
                  {/* <Route
                    path='/trip'
                    exact
                    component={AddTripForm}

                  /> */}
                   <Route
                    path='/other/:id'
                    exact
                    component={OtherUserProfile}

                  />
          </Switch>
        </Router>
      </div>
  );
}

export default App;

// "jest": {
//   "transformIgnorePatterns": [
//     "node_modules[/\\\\](?!@amcharts[/\\\\]amcharts4)",
//     "node_modules[/\\\\](?!bootstrap)",
//     "node_modules[/\\\\](?!jwt-decode)"
//   ]
// }