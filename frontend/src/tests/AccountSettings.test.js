import React from 'react';
import { render } from '@testing-library/react';
import AccountSettings from '../Containers/AccountSettings';
import NavbarComponent from '../Components/Navbar';
import UpdateEmail from '../Components/UpdateEmail';
import UpdatePassword from '../Components/UpdatePassword';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Account Settings', () => {
    let wrapper;
    let wrap;
    beforeEach(() => {
      wrapper = shallow(<AccountSettings />);
      // wrapper = mount(<AccountSettings />);
    });
  
    // it('matches the snapshot', () => {
    //   const tree = renderer.create(<App />).toJSON();
    //   expect(tree).toMatchSnapshot();
    // });
  
    test('contains div', () => {
      expect(wrapper.find(".account-settings-cointainer")).toBeTruthy();
    });

    test ('contains navbar', () => {
        expect(wrapper.contains(<NavbarComponent />)).toEqual(true);
    });

    test ('contains UpdateEmail', () => {
      expect(wrapper.contains(<UpdateEmail />)).toEqual(true);
    });

    test ('contains UpdatePassword', () => {
      expect(wrapper.contains(<UpdatePassword />)).toEqual(true);
    });

    

  
});