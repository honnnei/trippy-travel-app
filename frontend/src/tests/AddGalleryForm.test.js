import React, {useState, useEffect} from 'react';
import NavbarComponent from '../Components/Navbar';
import AddGalleryForm from '../Components/AddGalleryForm';
import { shallow, mount } from 'enzyme';

describe('AddGalleryForm', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrapper = shallow(<AddGalleryForm />);
      wrap = mount(<AddGalleryForm />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".login-form-container")).toBeTruthy();
    });

    it('HandleChange works', () => {
        wrap.find('#trip_caption').at(0).simulate('change', { target: { name: 'trip_caption', value: 'Lisbon Trip' } });
        expect(wrap.find('#trip_caption').at(0).prop('value')).toEqual('Lisbon Trip');
    });

    it('HandleChange works1', () => {
      expect(wrap.find('#image').at(0).prop('type')).toEqual('file');
      expect(wrapper.find('#image')).toBeTruthy();
    });


  

  
});