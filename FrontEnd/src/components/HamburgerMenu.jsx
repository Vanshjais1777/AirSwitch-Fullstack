import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Navigate, useNavigate } from 'react-router-dom';

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
                    <div id="sidebar" className={`fixed top-0 z-10 right-0 w-48 h-full bg-gray-800 text-white transition-transform duration-1000 ease-in-out ${visibleOptions ? 'translate-x-0' : 'translate-x-full'}`}>
                        <button id="closeBtn" className="p-4 text-white focus:outline-none" onClick={toggleOptions}>X</button>
                        <ul className="p-4">
                            <li className="py-2 border-b border-gray-600">Home</li>
                            <li className="py-2 border-b border-gray-600">Account</li>
                            <li className="py-2 border-b border-gray-600">Settings</li>
                            <li onClick={handleLogout} className="py-2 border-b border-gray-600">Log out</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default HamburgerMenu