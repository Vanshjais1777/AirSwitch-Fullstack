import React, { useState, useEffect } from 'react';
import { TbAirConditioning } from 'react-icons/tb';
import { FaTv, FaFan, FaLightbulb } from 'react-icons/fa';
import { IoCamera } from 'react-icons/io5';
import { GiCooler, GiSolarPower, GiPowerGenerator } from 'react-icons/gi';
import { LuProjector } from 'react-icons/lu';
import HamburgerMenu from '../components/HamburgerMenu';
import { Link } from 'react-router-dom'; // Import Link
import DevicesBtn from '../components/DevicesBtn';

const Switches = () => {
    const [visibleGrid, setVisibleGrid] = useState(false);
    const [showLogo, setShowLogo] = useState(() => {
        const storedFirstTime = localStorage.getItem('isFirstTime');
        return storedFirstTime === null ? true : false;
    });

    useEffect(() => {
        setVisibleGrid(true);
    }, []);

    return (
        <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-svh flex flex-col justify-center items-center overflow-hidden'>
            {visibleGrid && !showLogo && (
                <div className='m-3 pb-8 py-5 flex flex-col justify-center items-center bg-gradient-to-tl from-white via-gray-300 to-gray-400 border border-gray-300 shadow-lg rounded-lg p-3 transition-opacity duration-1000'>
                    <div className='flex items-center mb-4 justify-around space-x-24'>
                        <div>
                            <h1 className='font-bold text-3xl w-44 text-gray-800 p-3 rounded-lg animate-fade-in'>
                                Air Switch
                            </h1>
                        </div>
                        <HamburgerMenu />
                    </div>

                    {/* Device Buttons */}
                    <div className='grid grid-cols-3 grid-rows-3 gap-3 h-full'>
                        {[
                            { icon: <TbAirConditioning className='text-4xl text-purple-600' />, txt: "AC" },
                            { icon: <FaTv className='text-4xl text-red-600' />, txt: "TV" },
                            { icon: <FaFan className='text-4xl text-blue-500' />, txt: "FAN" },
                            { icon: <IoCamera className='text-4xl text-pink-600' />, txt: "CAMERA" },
                            { icon: <GiCooler className='text-4xl text-teal-500' />, txt: "WCOOLER" },
                            { icon: <LuProjector className='text-4xl text-yellow-500' />, txt: "PROJECTOR" },
                            { icon: <GiSolarPower className='text-4xl text-green-500' />, txt: "SOLAR" },
                            { icon: <GiPowerGenerator className='text-4xl text-orange-500' />, txt: "GENERATOR" },
                            { icon: <FaLightbulb className='text-4xl text-yellow-300' />, txt: "BULB" },
                        ].map(({ icon, txt }, index) => (
                            <Link
                                key={index}
                                to={`/${txt.toLowerCase()}`}
                                className='flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300 bg-gradient-to-r from-indigo-300 to-blue-300 p-4 rounded-lg shadow-md hover:shadow-xl transform transition-all h-36'
                            >
                                {icon}
                                <DevicesBtn txt={txt} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Switches;
