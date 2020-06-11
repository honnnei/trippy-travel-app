import React from 'react';
import { render } from '@testing-library/react';
import OtherUserInfo from '../Components/OtherUserInfo';
import OtherUserProfile from '../Containers/OtherUserProfile';
import OtherUserMap from '../Components/OtherUserMap'
import OtherUserGallery from '../Components/OtherUserGallery';
import OtherUserTimeline from '../Components/OtherUserTimeline';
import { Nav } from 'react-bootstrap'
import NavbarComponent from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('OtherUserProfile', () => {
    let wrapper;
    // beforeEach(() => {
      wrapper = shallow(<OtherUserProfile 
      match={{
          isExact: true,
          params: {id: "1"},
          path: "/other/:id",
          url: "/other/1"}} 
      />);
    // });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      // let wrapper = shallow(<OtherUserProfile />);
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
      expect(wrapper.contains(<OtherUserInfo />)).toBe(true);
    });

    test('contains UserMap', () => {
        expect(wrapper.contains(<OtherUserMap />)).toBe(true);
      });

      test('contains Galeery', () => {
          wrapper.find('#toggleTimeline').at(0).simulate('click');
        expect(wrapper.contains(<OtherUserTimeline />)).toBe(true);
      });

      test('toggles Timeline', () => {
        wrapper.find('#toggleTimeline').at(0).simulate('click');
      expect(wrapper.contains(<OtherUserTimeline />)).toBe(true);
    });

    test('toggles Galeery', () => {
        wrapper.find('#toggleGallery').at(0).simulate('click');
      expect(wrapper.contains(<OtherUserGallery />)).toBe(true);
    });

    test('toggles Map', () => {
        wrapper.find('#toggleGallery').at(0).simulate('click');
        wrapper.find('#toggleMap').at(0).simulate('click');
      expect(wrapper.contains(<OtherUserMap />)).toBe(true);
    });

    // test('contains LogInForm', () => {
    //   expect(wrapper.contains(<LogInForm />)).toBe(true);
    // });

    // test('SignUpForm is hidden', () => {
    //   expect(wrapper.contains(<SignUpForm />)).toBe(false);
    // });

  
});