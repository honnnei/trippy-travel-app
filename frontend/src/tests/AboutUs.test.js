import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SignUpPage from '../Containers/SignUpPage'

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