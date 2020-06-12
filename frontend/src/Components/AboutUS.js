import React from "react";

function AboutUs() {
    return (
        <div className="about-us-container">
             <img
                src={require('../images/trippy_logo.png')}
                width="150"
                height="150"
                style={{padding: '30'}}
                alt="Trippy Logo"
            />
            {/* class was 'instruction */}
            <h1>
                Trippy
        <br />
            </h1>
            <small>by hamr</small>
            <br />
            <p>
                <h2>Share your travels.</h2>
                <h3>Stay connected.</h3>
            </p>
        </div>
    );
}

export default AboutUs;
