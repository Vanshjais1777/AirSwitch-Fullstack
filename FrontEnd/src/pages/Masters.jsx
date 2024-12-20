import React, { useContext, useEffect, useState } from 'react';
import { MdAddToQueue } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import HamburgerMenu from '../components/HamburgerMenu';
import { AuthContext } from '../context/AuthContext';

const Masters = () => {
    const [masters, setMasters] = useState([]);  // Array to store master details
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility
    const [masterId, setMasterId] = useState('');
    const [masterName, setMasterName] = useState('');
    const [message, setMessage] = useState('');
    const { isLoggedIn, backendUrl } = useContext(AuthContext);
    const navigate = useNavigate();
        
    const showMaster = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await fetch(backendUrl + '/api/auth/fetch-master', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include token in headers
            },

        });
        const result = await response.json();
        setMasters([...masters, ...result]);
    }

    const goToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        showMaster();
    }, []);


    // Handle form submission to check if master exists
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only need masterId and masterName to send to backend
        const masterIdToCheck = { masterid: masterId, name: masterName };

        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        try {
            const response = await fetch(backendUrl + '/api/auth/add-master', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in headers
                },
                body: JSON.stringify(masterIdToCheck),
            });

            const result = await response.json();

            if (response.status === 200) {
                // Success: Master found, append it to the masters array
                setMasters([...masters, { masterid: masterId, name: masterName }]);
                setIsModalOpen(false); // Close modal
            } else {
                // Error: Master doesn't exist
                setMessage(result.message);
            }

        } catch (error) {
            console.error('Error fetching master:', error);
            setMessage(error.toString());
        }

        // Clear form inputs after submit
        setMasterId('');
        setMasterName('');
    };

    return (
        <div>
            {isLoggedIn ? (<div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-svh flex flex-col'>
                <div className='bg-white w-screen flex items-center justify-center h-20 gap-40'>
                    <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500'>MASTERS</h1>
                    <HamburgerMenu />
                </div>

                <div className="flex-grow relative p-4">
                    <div className="absolute bottom-7 right-7 bg-gradient-to-br from-blue-800 to-blue-400 p-4 rounded-lg inline-flex items-center justify-center cursor-pointer"
                        onClick={() => setIsModalOpen(true)}>
                        <MdAddToQueue className='text-4xl text-white' />
                    </div>

                    {/* Render Master Boxes */}
                    <div className="mt-10" onClick={() => navigate("/boards")}>
                        {masters.map((master, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4 flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-gray-800">Name: {master.name}</h2>
                                <h2 className="text-xl font-bold text-gray-800">ID: {master.masterid}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal for Checking Master */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                            <div className='flex gap-32 justify-center'>
                                <h2 className="text-xl font-bold mb-6 ml-2 w-44">ADD Master</h2>
                                <ImCross onClick={() => setIsModalOpen(false)} className='m-1 cursor-pointer' />
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Master Name"
                                    className="p-2 border border-gray-300 rounded"
                                    value={masterName}
                                    onChange={(e) => setMasterName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Master ID"
                                    className="p-2 border border-gray-300 rounded"
                                    value={masterId}
                                    onChange={(e) => setMasterId(e.target.value)}
                                    required
                                />
                                <p className='text-red-500'>{message}</p>
                                <button type="submit" className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-2 rounded">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>) : (
                <div className="flex items-center justify-center h-screen bg-red-600 text-white text-center">
                    <div className="bg-red-600 p-8 max-w-md">
                        <p className="text-4xl text-white font-bold mb-6">
                            Please Refresh Once !
                        </p>
                        <p className="text-2xl text-white font-semibold mb-10">
                            If it persists then Sorry, you do not have permission to view this page
                        </p>
                        <p className="text-2xl text-white font-semibold mb-10">
                            Kindly Login To Get Access.
                        </p>
                        <button
                            onClick={goToLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>)}
        </div>
    );
};

export default Masters;
