import React from 'react';
import { render } from '@testing-library/react';
import UpdatePassword from '../Components/UpdatePassword';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AlertMessage from '../Components/Alert';

describe('UpdatePassword', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrap = mount(<UpdatePassword />);
      wrapper = shallow(<UpdatePassword />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".update-password-container")).toBeTruthy();
    });

    it('HandleChange works', () => {
      wrap.find('#password-input').at(0).simulate('change', { target: { name: 'password', value: '123456' } });
      expect(wrap.find('#password-input').at(0).prop('value')).toEqual('123456');
    });

    it('HandleChange works', () => {
      wrap.find('#new-password-input').at(0).simulate('change', { target: { name: 'password', value: '123456' } });
      expect(wrap.find('#new-password-input').at(0).prop('value')).toEqual('123456');
    });

    it('HandleChange works', () => {
      wrap.find('#new-password-input-again').at(0).simulate('change', { target: { name: 'password', value: '123456' } });
      expect(wrap.find('#new-password-input-again').at(0).prop('value')).toEqual('123456');
    });

    // it('HandleChange works 2', () => {
    //   wrap.find('#email-input-new').at(0).simulate('change', { target: { name: 'new_user_email', value: 'hanna@gmail.com' } });
    //   expect(wrap.find('#email-input-new').at(0).prop('value')).toEqual('hanna@gmail.com');
    // });

  
});