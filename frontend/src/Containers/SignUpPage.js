import React, {useState} from 'react';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AboutUs from '../Components/AboutUs';

function SignUpPage() {
  const [showSignUp, setShowSignUp] = useState(true);
  const toggle = () => setShowSignUp(!showSignUp);

  return (
    <div className="signup-page-container">
      <AboutUs />
      {showSignUp ? (
        <div className="login_form" id="first">
          <LogInForm />
          <br />
          <p id="signup" className="signup" onClick={toggle}>
            Need an account? Register here!
          </p>
        </div>
      ) : (
        <div className="register_form" id="second">
          <SignUpForm />
          <p id="signin" className="signin" onClick={toggle}>
            Already have an account? Sign in here!
          </p>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
