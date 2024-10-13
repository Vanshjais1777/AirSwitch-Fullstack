import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    // Mock credentials for validation (You might fetch this data from an API or database)
    const validEmail = 'user@example.com';
    const validPassword = 'password123';

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate credentials
        if (email === validEmail && password === validPassword) {
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');

            // Navigate to the masters page
            navigate('/masters');
        } else {
            // Show error message
            setError('Invalid email or password');
        }

        if (!isLoggedIn) {
            navigate('/login');  // Redirect to login if not logged in
        } else {
            // Proceed with showing the grid or signup page logic
            setVisibleGrid(true);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center gap-2">
                <div className='h-16 flex justify-center'>
                    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Login
                    </h2>
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-400 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                >
                    Login
                </button>


                <div className='flex m-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
                    <Link to="/forgetpassword" className='font-semibold'>
                        <p className='font-bold'>Forget password?</p>
                    </Link>
                </div>

                <div className='flex gap-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
                    <p className='font-semibold'>Don't have an account?</p>
                    <Link to="/signup" className='font-bold'>SignUp</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
