import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { backendUrl } = useContext(AuthContext);
    useEffect(() => {
        const checkLoginStatus = localStorage.getItem('isLoggedIn');
        if (checkLoginStatus === 'true') {
            navigate('/masters');  // Redirect if user is already logged in
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset any previous errors

        try {
            const response = await fetch(backendUrl + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data?.token) {
                // Store token and login status
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/masters');  // Redirect to masters page after successful login
            } else {
                // Show error message from the server response
                setError(data?.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again later.');
        } finally {
            setLoading(false);
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
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-400 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-semibold transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-500 hover:to-blue-500'}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
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
