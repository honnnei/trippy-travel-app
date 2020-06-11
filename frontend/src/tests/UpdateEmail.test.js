import React from 'react';
import { render } from '@testing-library/react';
import UpdateEmail from '../Components/UpdateEmail';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AlertMessage from '../Components/Alert';

describe('UpdateEmail', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrap = mount(<UpdateEmail />);
      wrapper = shallow(<UpdateEmail />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".update-email-container")).toBeTruthy();
    });

    it('HandleChange works', () => {
      wrap.find('#email-input').at(0).simulate('change', { target: { name: 'user_email', value: 'hanna@gmail.com' } });
      expect(wrap.find('#email-input').at(0).prop('value')).toEqual('hanna@gmail.com');
    });

    it('HandleChange works 2', () => {
      wrap.find('#email-input-new').at(0).simulate('change', { target: { name: 'new_user_email', value: 'hanna@gmail.com' } });
      expect(wrap.find('#email-input-new').at(0).prop('value')).toEqual('hanna@gmail.com');
    });

  
});