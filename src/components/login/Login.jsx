import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import login from "../../assets/login.jpg";
import Logo from "../../assets/name.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Input from '../../Atoms/FormInput'; 
import Error from '../../Atoms/Error'; 
import Button from '../../Atoms/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    const storedSignupData = JSON.parse(localStorage.getItem('signupData')) || [];
    console.log("Stored signup data:", storedSignupData);

    const isUserValid = storedSignupData.some(data => data.email === email && data.password === password);
    console.log("Is user valid:", isUserValid);

    if (isUserValid) {
      const role = email.endsWith("@gmail.com") ? "user" : "admin";
      localStorage.setItem("role", role);
      window.location.href = "/";
    }
    else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={login} alt="Oswald Team" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Company Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back Tutee!</h2>
            <p>Please enter your details</p>
            <form>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="login-center-options">
                <Link to="/forgotpassword" className="forgot-pass-link">Forgot password?</Link>
              </div>
              {error && <Error message={error} />}
              <div className="login-center-buttons">
                <Button type="submit" onClick={handleLogin}>Log In</Button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
