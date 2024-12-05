import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Cart from './Pages/Cart';
import AdminDashboard from './components/Admin dashboard/AdminDashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import ManageUser from './components/Admin dashboard/ManageUser'
import ManageResource from './components/Admin dashboard/ManageResource'
import RequestResource from './components/Admin dashboard/RequestResource'

const App = () => {
  // Initialize cart state in the App component
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        <Route element={<ProtectedRoute />}>
        <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
        </Route>

        <Route path='/manage-users' element={<ManageUser />}></Route>
        <Route path='/manage-resources' element={<ManageResource />}></Route>
        <Route path='/resource-requests' element={<RequestResource />}></Route>

      </Routes>
    </div>
  );
};

export default App;
