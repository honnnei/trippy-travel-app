import React from 'react';
import { render } from '@testing-library/react';
import OtherUserInfo from '../Components/OtherUserInfo';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('UserInfo', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
        wrapper = shallow(<OtherUserInfo />);
      });
    //   match={{
    //     isExact: true,
    //     params: {id: "1"},
    //     path: "/other/:id",
    //     url: "/other/1"}} 
  
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

  
});