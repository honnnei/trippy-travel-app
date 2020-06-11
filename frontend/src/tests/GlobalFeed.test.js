import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import GlobalFeed from '../Containers/GlobalFeed';
import { shallow, mount } from 'enzyme';

describe('GlobalFeed', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrapper = shallow(<GlobalFeed />);
      wrap = mount(<GlobalFeed />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".global-feed-container")).toBeTruthy();
    });

    test('contains NavbarComponent', () => {
        expect(wrapper.contains(<NavbarComponent />)).toBe(true);
    });

    // test('contains div 2', () => {
    //     expect(wrapper.find(".timeline-gallery-map-container")).toBeTruthy();
    // });

    // test('contains div 2', () => {
    // expect(wrapper.find(".t-g-m-container")).toBeTruthy();
    // });

    

    // test('contains UserInfo', () => {
    //   expect(wrapper.contains(<UserInfo />)).toBe(true);
    // });

    // test('contains UserMap', () => {
    //     expect(wrapper.contains(<UserMap />)).toBe(true);
    //   });

    //   test('contains Galeery', () => {
    //       wrapper.find('#toggleTimeline').at(0).simulate('click');
    //     expect(wrapper.contains(<Timeline />)).toBe(true);
    //   });

    //   test('toggles Timeline', () => {
    //     wrapper.find('#toggleTimeline').at(0).simulate('click');
    //   expect(wrapper.contains(<Timeline />)).toBe(true);
    // });

    // test('toggles Galeery', () => {
    //     wrapper.find('#toggleGallery').at(0).simulate('click');
    //   expect(wrapper.contains(<Gallery />)).toBe(true);
    // });

    // test('toggles Map', () => {
    //     wrapper.find('#toggleGallery').at(0).simulate('click');
    //     wrapper.find('#toggleMap').at(0).simulate('click');
    //   expect(wrapper.contains(<UserMap />)).toBe(true);
    // });

    // test('contains LogInForm', () => {
    //   expect(wrapper.contains(<LogInForm />)).toBe(true);
    // });

    // test('SignUpForm is hidden', () => {
    //   expect(wrapper.contains(<SignUpForm />)).toBe(false);
    // });

  
});