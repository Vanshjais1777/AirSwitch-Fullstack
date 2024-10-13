import React, { useState } from 'react';
import { MdAddToQueue } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import HamburgerMenu from '../components/HamburgerMenu';

const Masters = () => {
    const [masters, setMasters] = useState([]);  // Array to store master details
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility
    const [masterName, setMasterName] = useState('');  // Form inputs
    const [masterId, setMasterId] = useState('');
    const [masterLocation, setMasterLocation] = useState('');  // Additional info
    const [boardsConnected, setBoardsConnected] = useState('');  // Additional info
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create new master object
        const newMaster = {
            id: masterId,
            name: masterName,
            location: masterLocation,
            boards: boardsConnected,
        };
        // Append new master to the array
        setMasters([...masters, newMaster]);

        // Clear form inputs and close modal
        setMasterName('');
        setMasterId('');
        setMasterLocation('');
        setBoardsConnected('');
        setIsModalOpen(false);
    };

    return (
        <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-svh w-svh flex flex-col'>
            <div className='bg-white p-2 w-screen flex items-center justify-center h-20 gap-48'>
                <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500'>MASTERS</h1>
                <HamburgerMenu />
            </div>

            <div className="flex-grow relative p-4">
                <div className="absolute bottom-7 right-7 bg-gradient-to-t from-sky-700 to-pink-600 p-4 rounded-lg inline-flex items-center justify-center cursor-pointer"
                    onClick={() => setIsModalOpen(true)}>
                    <MdAddToQueue className='text-4xl text-white' />
                </div>

                {/* Render Master Boxes */}
                <div className="mt-10" onClick={() => navigate("/boards")}>
                    {masters.map((master, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{master.name} (ID: {master.id})</h2>
                            <p className="text-gray-600">Location: {master.location}</p>
                            <p className="text-gray-600">Boards Connected: {master.boards}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Adding Master */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <div className='flex gap-32 justify-center'>
                            <h2 className="text-xl font-bold mb-6 text-center w-44">Add New Master</h2>
                            <ImCross onClick={() => setIsModalOpen(false)} className='m-1' />
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
                            <input
                                type="text"
                                placeholder="Location"
                                className="p-2 border border-gray-300 rounded"
                                value={masterLocation}
                                onChange={(e) => setMasterLocation(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Boards Connected"
                                className="p-2 border border-gray-300 rounded"
                                value={boardsConnected}
                                onChange={(e) => setBoardsConnected(e.target.value)}
                            />
                            <button type="submit" className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-2 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Masters;
