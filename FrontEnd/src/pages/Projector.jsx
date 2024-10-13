import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { LuProjector } from "react-icons/lu"; // Projector icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const Projector = () => {
  const [isOn, setIsOn] = useState(false); // State to manage Projector's on/off status
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/switches"); // Navigate back to Home
  };

  const toggleProjector = () => {
    setIsOn(!isOn); // Toggle the Projector's state
  };

  return (
    <div className='bg-gradient-to-br from-purple-500 to-blue-600 min-h-svh flex flex-col'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
        <button onClick={handleBack} className='text-gray-700 hover:text-blue-600 transition-colors'>
          <IoIosArrowBack className='text-2xl' />
        </button>
        <h1 className='font-bold text-xl'>Projector</h1>
        <SlOptionsVertical className='text-gray-700 hover:text-blue-600 transition-colors text-2xl' />
      </div>

      {/* Projector Control Section */}
      <div className='flex justify-center items-center h-72'>
        <div className='flex font-bold text-8xl text-white'>
          <h1>{isOn ? "On" : "Off"}</h1>
          <LuProjector className='ml-2 text-4xl text-blue-300' />
        </div>
      </div>

      {/* Toggle Button Section */}
      <div className='flex justify-center'>
        <button
          onClick={toggleProjector}
          className={`px-1 rounded-full mt-28 size-28 font-bold text-white transition-colors text-xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
          {isOn ? "Projector On" : "Projector Off"}
        </button>
      </div>
    </div>
  );
}

export default Projector;
