import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { IoCamera } from "react-icons/io5"; // Camera icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const Camera = () => {
  const [isOn, setIsOn] = useState(false); // State to manage Camera's on/off status
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/switches"); // Navigate back to Home
  };

  const toggleCamera = () => {
    setIsOn(!isOn); // Toggle the Camera's state
  };

  return (
    <div className='bg-gradient-to-br from-purple-500 to-blue-600 min-h-svh flex flex-col'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
        <button onClick={handleBack} className='text-gray-700 hover:text-blue-600 transition-colors'>
          <IoIosArrowBack className='text-2xl' />
        </button>
        <h1 className='font-bold text-xl'>Camera</h1>
        <SlOptionsVertical className='text-gray-700 hover:text-blue-600 transition-colors text-2xl' />
      </div>

      {/* Camera Control Section */}
      <div className='flex justify-center items-center h-80'>
        <div className='flex font-bold text-white'>
          <IoCamera className='text-9xl text-white' />
        </div>
      </div>

      {/* Toggle Button Section */}
      <div className='flex justify-center'>
        <button
          onClick={toggleCamera}
          className={`py-2 px-4 rounded-full mt-32 size-28 font-bold text-white transition-colors text-2xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
          {isOn ? "Camera On" : "Camera Off"}
        </button>
      </div>
    </div>
  );
}

export default Camera;
