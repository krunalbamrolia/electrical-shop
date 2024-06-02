import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Product from './components/pages/Product';
import Pricing from './components/pages/Price';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/login/Login';
import Signup from './components/login/SignUp';
import ForgotPassword from './components/login/Forgotpassword';
import CategoryPage from './components/pages/CategoryPage.jsx'; 
import BrandPage from './components/pages/BrandPage.jsx'; 
import ModelPage from './components/pages/ModelPage.jsx'; 
import { useDispatch } from 'react-redux';
import { GET_BRAND_PENDING, GET_CATEGORY_PENDING, GET_MODEL_PENDING, GET_PRODUCT_PENDING } from './Redux-Saga/user/Action/Action.js';

const MIN = 0;
const MAX = 2000;

const getRole = () => {
  return localStorage.getItem("role");
};

const App = () => {
  const role = getRole();
  const [values, setValues] = useState([MIN, MAX]);

  // let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: GET_PRODUCT_PENDING, type: GET_CATEGORY_PENDING, type: GET_BRAND_PENDING, type: GET_MODEL_PENDING });
  // }, []);

  if (!role || role === "") {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  if (role === "user") {
    return (
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={
              <div className="row">
                <div className="col-6">
                  <Dashboard />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    );
  }

  if (role === "admin") {
    return (
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/" element={<Navigate to="/products" />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return null; // Handle the case where the role is not recognized
};

export default App;
