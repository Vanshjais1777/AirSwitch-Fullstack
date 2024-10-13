import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { GiSolarPower } from "react-icons/gi"; // Solar Panel icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const SolarPanel = () => {
  const [isOn, setIsOn] = useState(false); // State to manage Solar Panel's on/off status
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/switches"); // Navigate back to Home
  };

  const toggleSolarPanel = () => {
    setIsOn(!isOn); // Toggle the Solar Panel's state
  };

  return (
    <div className='bg-gradient-to-br from-green-300 to-green-600 min-h-svh flex flex-col'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
        <button onClick={handleBack} className='text-gray-700 hover:text-green-600 transition-colors'>
          <IoIosArrowBack className='text-2xl' />
        </button>
        <h1 className='font-bold text-xl'>Solar Panel</h1>
        <SlOptionsVertical className='text-gray-700 hover:text-green-600 transition-colors text-2xl' />
      </div>

      {/* Solar Panel Control Section */}
      <div className='flex justify-center items-center h-72'>
        <div className='flex font-bold text-8xl text-white'>
          <h1>{isOn ? "On" : "Off"}</h1>
          <GiSolarPower className='ml-2 text-4xl text-green-300' />
        </div>
      </div>

      {/* Toggle Button Section */}
      <div className='flex justify-center'>
        <button
          onClick={toggleSolarPanel}
          className={`py-2 px-4 rounded-full mt-32 size-32 font-bold text-white transition-colors text-2xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
          {isOn ? "Solar Panel On" : "Solar Panel Off"}
        </button>
      </div>
    </div>
  );
}

export default SolarPanel;
