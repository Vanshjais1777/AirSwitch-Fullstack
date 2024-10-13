import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaLightbulb } from "react-icons/fa"; // Bulb icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const Bulb = () => {
  const [isOn, setIsOn] = useState(false); // State to manage Bulb's on/off status
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/switches"); // Navigate back to Home
  };

  const toggleBulb = () => {
    setIsOn(!isOn); // Toggle the Bulb's state
  };

  return (
    <div className='bg-gradient-to-br from-yellow-300 to-yellow-600 min-h-svh flex flex-col'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
        <button onClick={handleBack} className='text-gray-700 hover:text-yellow-600 transition-colors'>
          <IoIosArrowBack className='text-2xl' />
        </button>
        <h1 className='font-bold text-xl'>Bulb</h1>
        <SlOptionsVertical className='text-gray-700 hover:text-yellow-600 transition-colors text-2xl' />
      </div>

      {/* Bulb Control Section */}
      <div className='flex justify-center items-center h-72'>
        <div className='flex font-bold text-8xl text-white'>
          <h1>{isOn ? "On" : "Off"}</h1>
          <FaLightbulb className='ml-2 text-4xl text-yellow-300' />
        </div>
      </div>

      {/* Toggle Button Section */}
      <div className='flex justify-center'>
        <button
          onClick={toggleBulb}
          className={`py-2 px-4 rounded-full mt-32 size-28 font-bold text-white transition-colors text-2xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
          {isOn ? "Bulb On" : "Bulb Off"}
        </button>
      </div>
    </div>
  );
}

export default Bulb;
