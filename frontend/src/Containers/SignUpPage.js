import React, {useState} from 'react';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AboutUs from '../Components/AboutUS';
import NavbarComponent from '../Components/Navbar';
import {Button, Container, Row, Col} from 'react-bootstrap';
import '../css/SignUpPage.css'

function SignUpPage() {
  const [showSignUp, setShowSignUp] = useState(true);
  const toggle = () => setShowSignUp(!showSignUp);

  if(localStorage.usertoken){
    window.location.href="/feed"
  }

  return (
    <div className="sign-up-page-container">
    <NavbarComponent />
    <div className="sign-up-page-inner-container">
    <Container className="about-us">
      <Row>
        <Col >
          <AboutUs />
        </Col>
        <Col >
            {showSignUp ? (
            <div className="login_form" id="first">
              <LogInForm />
              <br />
              <Button id="signup" className="signup" onClick={toggle}>
                Need an account? Register here!
              </Button>
            </div>
             ) : (
            <div className="register_form" id="second">
              <SignUpForm toggle = {toggle}/>
              <Button id="signin" className="signin" onClick={toggle}>
                Already have an account? Sign in here!
              </Button>
            </div>
              )}
            </Col>
      
      </Row>
      
    </Container>
    </div>
    </div>
  );
}

export default SignUpPage;
