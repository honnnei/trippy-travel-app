import React, { useState, useEffect, useCallback } from "react";
import OtherUserGallery from "../Components/OtherUserGallery";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { shallow, mount } from 'enzyme';

describe("OtherUserOtherUserGallery", () => { 

    it("renders main gallery-container div", () => {
        let wrapper = shallow(<OtherUserGallery />);
        expect(wrapper.exists(".gallery-container")).toEqual(true);
    });
});
