import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaFan } from "react-icons/fa"; // Fan icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const Fan = () => {
  const [isOn, setIsOn] = useState(false); // State to manage Fan's on/off status
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/switches"); // Navigate back to Home
  };

  const toggleFan = () => {
    setIsOn(!isOn); // Toggle the Fan's state
  };

  return (
    <div className='bg-gradient-to-br from-purple-500 to-blue-600 min-h-svh flex flex-col'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
        <button onClick={handleBack} className='text-gray-700 hover:text-blue-600 transition-colors'>
          <IoIosArrowBack className='text-2xl' />
        </button>
        <h1 className='font-bold text-xl'>Fan</h1>
        <SlOptionsVertical className='text-gray-700 hover:text-blue-600 transition-colors text-2xl' />
      </div>

      {/* Fan Control Section */}
      <div className='flex justify-center items-center h-72'>
        <div className='flex font-bold text-8xl text-white'>
          <h1>{isOn ? "On" : "Off"}</h1>
          <FaFan className='ml-2 text-4xl text-blue-300' />
        </div>
      </div>

      <div className='border flex justify-between bg-white p-4 rounded-lg shadow-md'>
        <div className='text-5xl text-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-100 rounded-full p-2 transition'>
          <BsDash />
        </div>
        <div className='text-3xl text-gray-800 flex items-center justify-center'>
          <h1>Speed</h1>
        </div>
        <div className='text-5xl text-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-100 rounded-full p-2 transition'>
          <h1>+</h1>
        </div>
      </div>

      {/* Toggle Button Section */}
      <div className='flex justify-center'>
        <button
          onClick={toggleFan}
          className={`py-2 px-4 rounded-full mt-32 size-28 font-bold text-white transition-colors text-2xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
          {isOn ? "Fan On" : "Fan Off"}
        </button>
      </div>
    </div>
  );
}

export default Fan;
