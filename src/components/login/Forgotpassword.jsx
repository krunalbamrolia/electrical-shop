import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Forgot from "../../assets/forgot.png";
import Logo from "../../assets/name.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Input from '../../Atoms/FormInput';
import Error from '../../Atoms/Error';
import Button from '../../Atoms/Button';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    let storedSignupData = JSON.parse(localStorage.getItem('signupData')) || [];

    const userIndex = storedSignupData.findIndex(data => data.email === email);

    if (userIndex === -1) {
      setError('Email not found');
      return;
    }

    storedSignupData[userIndex].password = newPassword;
    localStorage.setItem('signupData', JSON.stringify(storedSignupData));

    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('Password changed successfully');
  };

  return (
    <div className="login-main ">
      <div className="login-left">
        <img src={Forgot} alt="img" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Company Logo" />
          </div>
          <div className="login-center">
            <h2>Forgot Password?</h2>
            <p>Change your password</p>
            <form onSubmit={handleChangePassword}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <Error message={error} />}
              <div className="login-center-buttons">
                <Button type='button' onClick={handleChangePassword}>
                  Change Password
                </Button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Remembered your password? <Link to="/">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

