import React, {useState, useEffect} from 'react';
import LogInForm from '../Components/LogInForm'
import SignUpForm from '../Components/SignUpForm'

function SignUpPage() {
  const [showSignUp, setShowSignUp] = useState(true);
  const toggle = () => setShowSignUp(!showSignUp);

  return (
    <div className="signup-page-container">
      {showSignUp ? (
        <div className="login_form" id="first">
          <LogInForm />
          <br />
          <p id="signup" className="signup" onClick={toggle}>
            Need and account? Register here!
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
