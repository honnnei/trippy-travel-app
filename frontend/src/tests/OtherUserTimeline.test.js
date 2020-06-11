import React, { useState, useEffect, useCallback } from "react";
import OtherUserTimeline from "../Components/OtherUserTimeline";
import { enableFetchMocks } from "jest-fetch-mock";
import Enzyme, { shallow, render, mount } from "enzyme";
import { Form, Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";


// enableFetchMocks();
window.alert = jest.fn();
// jest.mock("jwt-decode");


describe(" OtherUserTimeline Components testing ", () => {
  let wrapper;
  let wrap;
  beforeEach(() => {
    wrap = mount(<OtherUserTimeline />);
    wrapper = shallow(<OtherUserTimeline />);
  });
    
  it("renders main timeline-container div", () => {
    expect(wrapper.find(".timeline-container")).toBeTruthy();
  });

  it("renders main timeline-container div", () => {
    expect(wrapper.find(".trip-container")).toBeTruthy();
    expect(wrapper.find(".user-trip")).toBeTruthy();
    expect(wrapper.find(".trip-images")).toBeTruthy();
    expect(wrapper.find(".trip-area")).toBeTruthy();
  });    

});