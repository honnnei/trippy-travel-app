// npm test -- --coverage --watchAll=false
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SignUpPage from '../Containers/SignUpPage';
import GlobalFeed from '../Containers/GlobalFeed';
import UserProfile from '../Containers/UserProfile';
import OtherUserProfile from '../Containers/OtherUserProfile';
import AccountSettings from '../Containers/AccountSettings';

describe('App', () => {
  let wrapper;
  let wrap;
  beforeEach(() => {
    wrapper = shallow(<App />);
    wrap = mount(<App />); 
  });

  // it('matches the snapshot', () => {
  //   const tree = renderer.create(<App />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  test('contains Routes', () => {
    expect(wrapper.containsMatchingElement(<Route />)).toEqual(true);
  });

  // test('contains a Switch Statement', () => {
  //   expect(wrapper.containsMatchingElement(<Switch></Switch>)).toEqual(true);
  // });

  test('contains 5 Routes', () => {
    console.log(wrapper.debug());
    expect((wrapper.find('Route').length)).toEqual(5);
  });

   test('Route to SignUpPage is exact', () => {                                    
    let route = wrap.find(<Route path='/' exact component={SignUpPage}/>);
    expect(route).toBeTruthy();
   });

   test('Route to GlobalFeed is exact', () => {                                  
    let route = wrap.find( <Route path='/feed' exact component={GlobalFeed}/>);
    expect(route).toBeTruthy();
   });

  test('Route to UserProfile is exact', () => {                                         
    let route = wrap.find( <Route path='/profile' exact component={UserProfile} />);
    expect(route).toBeTruthy();
  });

  test('Route to AccountSettings is exact', () => {                                         
    let route = wrap.find( <Route path='/settings' exact component={AccountSettings} />);
    expect(route).toBeTruthy();
  });

  test('Route to OtherUserProfile is exact', () => {                                         
    let route = wrap.find( <Route path='/other/:id' exact component={OtherUserProfile} />);
    expect(route).toBeTruthy();
  });

    
});

