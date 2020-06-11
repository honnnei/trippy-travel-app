import React, { useState, useEffect, useCallback } from "react";
import Timeline from "../Components/Timeline";
import AddTripForm from "../Components/AddTripForm";
import { enableFetchMocks } from "jest-fetch-mock";
import Enzyme, { shallow, render, mount } from "enzyme";
import { Form, Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";


// enableFetchMocks();
window.alert = jest.fn();
// jest.mock("jwt-decode");


describe(" Timeline Components testing ", () => {
  let wrapper;
  let wrap;
  beforeEach(() => {
    wrap = mount(<Timeline />);
    wrapper = shallow(<Timeline />);
  });
    
  it("renders main timeline-container div", () => {
    expect(wrapper.find(".timeline-container")).toBeTruthy();
  });

  it("renders main timeline-container div", () => {
    expect(wrapper.find(".trip-container")).toBeTruthy();
    expect(wrapper.find(".user-trip")).toBeTruthy();
    expect(wrapper.find(".button-area")).toBeTruthy();
    expect(wrapper.find(".trip-images")).toBeTruthy();
    expect(wrapper.find(".trip-area")).toBeTruthy();
  });

    
    it("when ESC key is pressed close mock modal", () => {
      const closeFn = jest.fn();
      const element = document.createElement("div");
      ReactDOM.render(<Modal closeFn={closeFn}>Hello World</Modal>, element);
    });

    it("Renders <h1> in Timeline comp", () => {
      expect(wrapper.exists("h1")).toEqual(true);
    });

     it("renders button with custom text", () => {
       const button = wrap.find("Button");
       expect(button).toHaveLength(1);
       const buttonChoose = wrap.find("Button").at(0);
       expect(buttonChoose.text()).toEqual("Add Trip");
     });
    it("toggles AddTrip", () => {
          const closeFn = jest.fn();
       wrapper.find("#toggleAddTripModal").at(0).simulate("click");
       expect(wrapper.contains(<AddTripForm closeFn={closeFn} />)).toBe(false);
     });

});
