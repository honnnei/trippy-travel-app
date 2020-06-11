import React from 'react';
import { render } from '@testing-library/react';
import UserInfo from '../Components/UserInfo'
import UserProfile from '../Containers/UserProfile';
import UserMap from '../Components/UserMap'
import Gallery from '../Components/Gallery';
import Timeline from '../Components/Timeline';
import { Nav } from 'react-bootstrap'
import NavbarComponent from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('UserProfile', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<UserProfile />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".user-profile-page-container")).toBeTruthy();
    });

    test('contains div 2', () => {
        expect(wrapper.find(".timeline-gallery-map-container")).toBeTruthy();
    });

    test('contains div 2', () => {
    expect(wrapper.find(".t-g-m-container")).toBeTruthy();
    });

    test('contains NavbarComponent', () => {
      expect(wrapper.contains(<NavbarComponent />)).toBe(true);
    });

    test('contains UserInfo', () => {
      expect(wrapper.contains(<UserInfo />)).toBe(true);
    });

    test('contains UserMap', () => {
        expect(wrapper.contains(<UserMap />)).toBe(true);
      });

      test('contains Galeery', () => {
          wrapper.find('#toggleTimeline').at(0).simulate('click');
        expect(wrapper.contains(<Timeline />)).toBe(true);
      });

      test('toggles Timeline', () => {
        wrapper.find('#toggleTimeline').at(0).simulate('click');
      expect(wrapper.contains(<Timeline />)).toBe(true);
    });

    test('toggles Galeery', () => {
        wrapper.find('#toggleGallery').at(0).simulate('click');
      expect(wrapper.contains(<Gallery />)).toBe(true);
    });

    test('toggles Map', () => {
        wrapper.find('#toggleGallery').at(0).simulate('click');
        wrapper.find('#toggleMap').at(0).simulate('click');
      expect(wrapper.contains(<UserMap />)).toBe(true);
    });

    // test('contains LogInForm', () => {
    //   expect(wrapper.contains(<LogInForm />)).toBe(true);
    // });

    // test('SignUpForm is hidden', () => {
    //   expect(wrapper.contains(<SignUpForm />)).toBe(false);
    // });

  
});