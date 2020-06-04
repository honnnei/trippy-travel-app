import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
                      path='/user-info'
                      exact 
                      component={UserInfo}
                  />
                   <Route 
                      path='/user-map'
                      exact 
                      component={UserMap}
                  />
                  <Route 
                      path='/user-settings'
                      exact 
                      component={AccountSettings}

                  />
                  <Route
                      path='/user'
                      exact 
                      component={UserProfile}
                  />
               </Switch>
      </Router>
    </div>
  );
}

export default App;
