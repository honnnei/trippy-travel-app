import ReactDOM from 'react-dom';
import App from '../App';
import React from 'react';

jest.mock('react-dom', ()=> ({render: jest.fn()}))


it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
});