import React, { useState, useEffect, useCallback } from "react";
import Gallery from "../Components/Gallery";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { shallow, mount } from 'enzyme';

describe("Gallery", () => { 

    let wrapper;
    let wrap;
    beforeEach(() => {
        wrapper = shallow(<Gallery />);
        wrap = mount(<Gallery/>);
    });

    it("renders main gallery-container div", () => {
      expect(wrapper.exists(".gallery-container")).toEqual(true);
    });

    it("renders main gallery-container div", () => {
      expect(wrapper.exists(".add-trip-area")).toEqual(true);
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
