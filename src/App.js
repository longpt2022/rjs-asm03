import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/HomePage';
import Shop from './pages/ShopPage';
import Detail from './pages/DetailPage';
import Cart from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import Profile from './pages/ProfilePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Layout from './Components/layout/Layout';

function App() {
  return (
    // 2. Tạo Router cho ứng dụng bằng react-router-dom@6
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Layout>
  );
}

export default App;
