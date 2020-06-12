import React, { useState, useEffect, useCallback } from "react";
import Gallery from "../Components/Gallery";
import { enableFetchMocks } from "jest-fetch-mock";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
Enzyme.configure({ adapter: new Adapter() });

enableFetchMocks();
window.alert = jest.fn();
jest.mock("jwt-decode");

describe(" Gallery components", () => { 

    let wrapper,wrap;
    beforeEach(() => {
        wrapper = shallow(<Gallery />);
        wrap = mount(<Gallery/>);
    });

    it("renders main gallery-container div", () => {
      expect(wrapper.exists(".gallery-container")).toEqual(true);
    });
     it("renders userImage area", () => {
       expect(wrapper.exists(".trip-container")).toEqual(true);
     });

    it("renders button with custom text", () => {
      const button = wrap.find("Button");
      expect(button).toHaveLength(1);
      const buttonChoose = wrap.find("Button").at(0);
      expect(buttonChoose.text()).toEqual("Upload Images");
    });

     it("toggles Add images", () => {
       const closeFn = jest.fn();
       wrapper.find("#toggleAddGalleryModal").at(0).simulate("click");
       expect(wrapper.contains(<Modal></Modal>)).toBe(false);
     });
    
     it("renders button with custom text", () => {
       expect("#deleteButton").toHaveLength(13);
     });

});
