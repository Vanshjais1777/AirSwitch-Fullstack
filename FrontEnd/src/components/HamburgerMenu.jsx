import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Navigate, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
const HamburgerMenu = () => {
    const [visibleOptions, setVisibleOptions] = useState(false); // Sidebar state
    const navigate = useNavigate();

    const toggleOptions = () => {
        setVisibleOptions(!visibleOptions); // Toggle sidebar menu
    }

    const handleLogout = () => {
        localStorage.removeItem('userSignedUp');
        navigate('/login');
    };

    return (
        <div>
            <div onClick={toggleOptions}>
                <GiHamburgerMenu className='h-7 w-7' />
            </div>
            {
                visibleOptions && (
                    <div id="sidebar" className={`fixed top-0 z-10 right-0 w-44 h-full bg-white font-semibold border text-black transition-transform duration-1000 ease-in-out ${visibleOptions ? 'translate-x-0' : 'translate-x-full'}`}>
                        <button className="p-4 text-black" onClick={toggleOptions}>
                            <ImCross className='m-1 cursor-pointer' />
                        </button>
                        <ul className="p-2 flex flex-col gap-2 cursor-pointer text-xl">
                            <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Home</li>
                            <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Account</li>
                            <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Settings</li>
                            <li onClick={handleLogout} className="p-3 border-b border-gray-600 bg-red-600 text-white rounded-md flex justify-center items-center">Log out</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default HamburgerMenu