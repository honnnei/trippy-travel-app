import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import SignUpForm from '../Components/SignUpForm';
import { shallow, mount } from 'enzyme';

describe('SignUpForm', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrapper = shallow(<SignUpForm />);
      wrap = mount(<SignUpForm />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".signup-form-container")).toBeTruthy();
    });

    it('HandleChange works', () => {
        wrap.find('#email').at(0).simulate('change', { target: { name: 'user_email', value: 'bob@gmail.com' } });
        expect(wrap.find('#email').at(0).prop('value')).toEqual('bob@gmail.com');
    });

    it('HandleChange works1', () => {
        wrap.find('#password').at(0).simulate('change', { target: { name: 'password', value: '123456' } });
        expect(wrap.find('#password').at(0).prop('value')).toEqual('123456');
    });

    it('HandleChange works2', () => {
        wrap.find('#re-password').at(0).simulate('change', { target: { name: 're-password', value: '123456' } });
        expect(wrap.find('#re-password').at(0).prop('value')).toEqual('123456');
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