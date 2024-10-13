import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ac from './pages/Ac';
import Tv from './pages/Tv';
import Fan from './pages/Fan';
import Camera from './pages/Camera';
import WaterCooler from './pages/WaterCooler';
import Projector from './pages/Projector';
import SolarPanel from './pages/SolarPanel';
import Generator from './pages/Generator';
import Bulb from './pages/Bulb';
import SignUp from './pages/SIgnUp';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import { AuthProvider } from './context/AuthContext';
import Masters from './pages/Masters';
import Boards from './pages/Boards';
import Switches from './pages/Switches';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ac" element={<Ac />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/fan" element={<Fan />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/wcooler" element={<WaterCooler />} />
          <Route path="/projector" element={<Projector />} />
          <Route path="/solar" element={<SolarPanel />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/bulb" element={<Bulb />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/switches" element={<Switches />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;