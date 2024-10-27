import React, { useContext, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = () => {
  const [visibleOptions, setVisibleOptions] = useState(false); // Sidebar state
  const { handleLogout } = useContext(AuthContext); // Get handleLogout from AuthContext
  const navigate = useNavigate();

  const toggleOptions = () => {
    setVisibleOptions(!visibleOptions); // Toggle sidebar menu
  };

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Call the logout function
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div>
      <div onClick={toggleOptions}>
        <GiHamburgerMenu className='h-7 w-7' />
      </div>
      {
        visibleOptions && (
          <div id="sidebar" className="fixed top-0 z-10 right-0 w-44 h-full bg-white font-semibold border text-black transition-transform duration-1000 ease-in-out">
            <button className="p-4 text-black" onClick={toggleOptions}>
              <ImCross className='m-1 cursor-pointer' />
            </button>
            <ul className="p-2 flex flex-col gap-2 cursor-pointer text-xl">
              <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Home</li>
              <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Account</li>
              <li className="p-3 border-b border-gray-600 bg-gray-700 text-white rounded-md flex justify-center items-center">Settings</li>
              <li onClick={handleLogoutAndRedirect} className="p-3 border-b border-gray-600 bg-red-600 text-white rounded-md flex justify-center items-center cursor-pointer">Log out</li>
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default HamburgerMenu;
