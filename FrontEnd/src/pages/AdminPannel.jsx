import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import HamburgerMenu from '../components/HamburgerMenu';

const AdminPannel = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // Initial modal for admin code
    const [masterId, setMasterId] = useState('');
    const [message, setMessage] = useState('');
    const [adminCodeInput, setAdminCodeInput] = useState('');
    const [adminAccess, setAdminAccess] = useState(false); // State to manage access

    const handleAdminCodeSubmit = (e) => {
        e.preventDefault();
        if (adminCodeInput === 'fhlt kfbe mxon zmjb') {
            setAdminAccess(true);
            setIsModalOpen(false);
            setMessage('');
        } else {
            setMessage("Wrong admin code");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/register-master', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ masterid: masterId })
            });

            const result = await response.json();

            if (response.status === 200) {
                setMessage('Master registered successfully!');
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error('Error adding master', error);
            setMessage('Server error: ' + error.toString());
        }

        setMasterId('');
    }

    // Render a modal for entering admin code when the page mounts
    return (
        <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col min-h-screen'>
            {!adminAccess && isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Enter Admin Code</h2>
                        <form onSubmit={handleAdminCodeSubmit} className="flex flex-col gap-4">
                            <input
                                type="password"
                                placeholder="Admin Code"
                                className="p-2 border border-gray-300 rounded"
                                value={adminCodeInput}
                                onChange={(e) => setAdminCodeInput(e.target.value)}
                                required
                            />
                            <p className='text-red-500'>{message}</p>
                            <button type="submit" className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-2 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {adminAccess && (
                <>
                    <div className='bg-white w-screen flex items-center justify-center h-20 gap-24 cursor-pointer'>
                        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500'>Admin Panel</h1>
                        <HamburgerMenu />
                    </div>

                    <div className='flex justify-center items-center flex-grow'>
                        <div onClick={() => setIsModalOpen(true)} className='bg-gradient-to-br from-blue-800 to-blue-400 text-white p-4 h-18 w-52 rounded text-xl cursor-pointer'>
                            <button className='font-semibold'>REGISTER MASTER</button>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                <div className='flex gap-32 h-12'>
                                    <h2 className="text-xl font-bold ml-3 w-44">ADD Master ID</h2>
                                    <ImCross onClick={() => setIsModalOpen(false)} className='m-1 cursor-pointer' />
                                </div>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                </>
            )}
        </div>
    );
}

export default AdminPannel;
