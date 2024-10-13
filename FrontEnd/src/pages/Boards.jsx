import React from 'react'
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';

const Boards = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-svh w-svh flex flex-col'>
      <div className='bg-white p-2 w-screen flex items-center justify-center h-20 mb-4 gap-52'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500'>BOARDS</h1>
        <HamburgerMenu />
      </div>

      <div className="m-3" onClick={() => navigate("/switches")}>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800"> Board - 1</h2>
          <p className="text-gray-600">Location: IOT LAB</p>
        </div>
      </div>

      <div className="m-3" onClick={() => navigate("/switches")}>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800"> Board - 2</h2>
          <p className="text-gray-600">Location: Physics LAB</p>
        </div>
      </div>
    </div>
  )
};

export default Boards;
