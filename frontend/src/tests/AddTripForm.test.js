import React, { useState, useEffect, useCallback } from "react";
import AddTripForm from "../Components/AddTripForm";
import { shallow, mount } from 'enzyme';

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
    
     it("HandleChange works", () => {
      wrapper.find("#trip_country_code").at(0).simulate("change", { target: { name: "trip_country_code", value: "AF" } });
      expect(wrapper.find("#trip_country_code").at(0).prop("value")).toEqual("AF");
    });

<<<<<<< HEAD
     it("HandleChange works", () => {
      wrapper.find("#trip_bio").at(0).simulate("change", { target: { name: "trip_bio", value: "beautiful" } });
      expect(wrapper.find("#trip_bio").at(0).prop("value")).toEqual("beautiful");
    });

    it("HandleChange works", () => {
      wrapper.find("#trip_length").at(0).simulate("change", { target: { name: "trip_length", value: "AF" } });
      expect(wrapper.find("#trip_length").at(0).prop("value")).toEqual("AF");
    });

    it('HandleChange works1', () => {
      expect(wrapper.find('#image').at(0).prop('type')).toEqual('file');
      expect(wrapper.find('#image')).toBeTruthy();
    });

=======
  
  it("HandleChange works", () => {
    wrap
      .find("#bio_input")
      .at(1)
      .simulate("change", {
        target: { name:"trip_bio", value: "beautiful" },
      });
    expect(wrap.find("#bio_input").at(1).prop("value")).toEqual(
      "beautiful"
    );
  });
>>>>>>> aa602ccc6f2c817bd60dda30bb76a496057c5e29

    
});