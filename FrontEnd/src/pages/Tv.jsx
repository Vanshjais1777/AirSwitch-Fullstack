import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaTv } from "react-icons/fa6"; // TV icon
import { useNavigate } from 'react-router-dom';

const Tv = () => {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/switches");
    };

    const toggleTv = () => {
        setIsOn(!isOn);
    };

    return (
        <div className='bg-gradient-to-br from-blue-500 to-indigo-600 min-h-svh flex flex-col'>
            {/* Header Section */}
            <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
                <button onClick={handleBack} className='text-gray-700 hover:text-blue-600 transition-colors'>
                    <IoIosArrowBack className='text-2xl' />
                </button>
                <h1 className='font-bold text-xl'>TV</h1>
                <SlOptionsVertical className='text-gray-700 hover:text-blue-600 transition-colors text-2xl' />
            </div>

            {/* TV Screen Section */}
            <div className='flex justify-center items-center h-96'>
                <div className='flex font-bold text-8xl text-white animate-fade-in'>
                    <FaTv className={`ml-2 text-8xl ${isOn ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
            </div>

            {/* On/Off Toggle Button */}
            <div className='flex justify-center mb-4'>
                <button
                    onClick={toggleTv}
                    className={`size-24 transform transition-transform py-2 px-2 rounded-full font-bold text-white 
                        ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} transition-colors`}
                >
                    {isOn ? "Turn Off" : "Turn On"}
                </button>
            </div>
        </div>
    );
}

export default Tv;
