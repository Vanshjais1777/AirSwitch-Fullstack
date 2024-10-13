import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { GiPowerGenerator } from "react-icons/gi"; // Generator icon
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';

const Generator = () => {
    const [isOn, setIsOn] = useState(false); // State to manage Generator's on/off status
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/switches"); // Navigate back to Home
    };

    const toggleGenerator = () => {
        setIsOn(!isOn); // Toggle the Generator's state
    };

    return (
        <div className='bg-gradient-to-br from-orange-400 to-orange-600 min-h-svh flex flex-col'>
            {/* Header Section */}
            <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-md'>
                <button onClick={handleBack} className='text-gray-700 hover:text-orange-600 transition-colors'>
                    <IoIosArrowBack className='text-2xl' />
                </button>
                <h1 className='font-bold text-xl'>Generator</h1>
                <SlOptionsVertical className='text-gray-700 hover:text-orange-600 transition-colors text-2xl' />
            </div>

            {/* Generator Control Section */}
            <div className='flex justify-center items-center h-72'>
                <div className='flex font-bold text-8xl text-white'>
                    <h1>{isOn ? "On" : "Off"}</h1>
                    <GiPowerGenerator className='ml-2 text-4xl text-orange-300' />
                </div>
            </div>

            {/* Toggle Button Section */}
            <div className='flex justify-center'>
                <button
                    onClick={toggleGenerator}
                    className={`flex justify-center items-center py-2 px-4 rounded-full mt-32 size-32 font-bold text-white transition-colors text-2xl ${isOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                    {isOn ? "Generator On" : "Generator Off"}
                </button>
            </div>
        </div>
    );
}

export default Generator;
