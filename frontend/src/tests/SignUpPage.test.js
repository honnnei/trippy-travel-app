import React from 'react';
import { render } from '@testing-library/react';
import SignUpPage from '../Containers/SignUpPage';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AboutUs from '../Components/AboutUS';
import NavbarComponent from '../Components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('SignUpPage', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SignUpPage />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".sing-up-page-container")).toBeTruthy();
    });

    test('contains div 2', () => {
      expect(wrapper.find("sign-up-page-inner-container")).toBeTruthy();
    });

    test('contains NavbarComponent', () => {
      expect(wrapper.contains(<NavbarComponent />)).toBe(true);
    });

    test('contains AboutUs', () => {
      expect(wrapper.contains(<AboutUs />)).toBe(true);
    });

    test('contains LogInForm', () => {
      expect(wrapper.contains(<LogInForm />)).toBe(true);
    });

    test('SignUpForm is hidden', () => {
      expect(wrapper.contains(<SignUpForm />)).toBe(false);
    });
    

    
    // test('contains LogInForm', () => {
    //   wrapper.find('#signup').at(0).simulate('click');
    //   expect(wrapper.contains(<SignUpForm />)).toBe(true);
    // });
  
});