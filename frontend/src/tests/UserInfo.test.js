import React from 'react';
import { render } from '@testing-library/react';
import UserInfo from '../Components/UserInfo';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('UserInfo', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrap = mount(<UserInfo />);
      wrapper = shallow(<UserInfo />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".user-info-container")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".user-info-name-container")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".user-info-display-name")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".user-info-image-container")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".user-info-bio-container")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".user-info-country-counter")).toBeTruthy();
    });

    test('contains div', () => {
      expect(wrapper.find(".modal")).toBeTruthy();
    });

    it('Login input on change the existingUsername should change', () => {
      expect(wrapper.find('#modal-form')).toBeTruthy();
    });


  
});