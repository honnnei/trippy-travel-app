import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../Components/AboutUs';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('App', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AboutUs />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".about-us-container")).toBeTruthy();
    });
  
});