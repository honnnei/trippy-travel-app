import React, { useState, useEffect, useCallback } from "react";
import AddTripForm from "../Components/AddTripForm";
import { enableFetchMocks } from "jest-fetch-mock";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Form, Button } from "react-bootstrap";

Enzyme.configure({ adapter: new Adapter() });
enableFetchMocks();
window.alert = jest.fn();
// jest.mock("jwt-decode");

describe(" Add trip form ", () => {
    // let wrapper = shallow(<AddTripForm />);
    let wrap;

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddTripForm />);
      wrap = mount(<AddTripForm />);
    });

    it("renders main trip_form div", () => {
        expect(wrapper.find(".add-trip-form-container")).toBeTruthy();
    });
    it("Should include form", () => {
        expect(wrapper.exists("Form")).toEqual(true);
    });
    it("check the user input", () => {
       const input = wrap.find("input");
       expect(input).toHaveLength(3);
    });
    it("renders submit button with custom text", () => {
      const button = wrap.find("Button");
      expect(button).toHaveLength(2);
      const buttonChoose = wrap.find("Button").at(0);
      expect(buttonChoose.text()).toEqual("Create Trip");
    });
      it("renders country selection", () => {
        const select = wrap.find("select");
        const options = wrapper.find("option");
        expect(select).toHaveLength(1);
        expect(options).toHaveLength(250);
      });
    
     it("Tests the first dropdown option is the correct value", () => {
       const select = wrap.find("select");
       const optionOne = wrapper.find("option").at(0);
       expect(optionOne.prop("value")).toEqual("");
     });
    
});