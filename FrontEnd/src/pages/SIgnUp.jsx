import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { setIsFirstTime, handleLogin } = useContext(AuthContext); // Use handleLogin from AuthContext to handle login
    const navigate = useNavigate();
    const { backendUrl } = useContext(AuthContext);

    // Form validation logic
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!username) {
            formErrors.username = 'Username is required';
            isValid = false;
        }
        if (!email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email is invalid';
            isValid = false;
        }
        if (!password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        setErrors(formErrors);
        return isValid;
    };

    // Handle Signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        // First validate the form
        if (!validateForm()) {
            return;  // If form is invalid, don't proceed
        }

        // Now send the request to the backend
        try {
            const response = await fetch(backendUrl + '/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                handleLogin(data.token);  // Store the token and log the user in
                setIsFirstTime(false);  // Set first-time flag to false
                navigate('/masters');  // Redirect to masters page
            } else {
                setErrors({ general: data.message });
            }
        } catch (error) {
            console.error('Signup failed', error);
            setErrors({ general: 'Something went wrong. Please try again later.' });
        }
    };


    // Separate function for Google Sign-In
    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        // Here you would typically implement your Google sign-in logic using Firebase or another service
        console.log('Google Sign-In logic here');
    };

    return (
        <div className="h-svh w-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center overflow-hidden">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">
                    Create an Account
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-red-500 text-white p-3 rounded-full font-semibold hover:from-red-500 hover:to-purple-500 transition-all duration-300"
                >
                    Sign Up
                </button>

                <div className="flex justify-center mt-3 mb-3 text-pink-700 items-center">
                    <p>Or</p>
                </div>

                <div className="flex justify-center items-center border border-pink-600 w-full rounded-full">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full text-pink-600 p-3 rounded-lg font-semibold hover:from-red-500 hover:to-purple-500 transition-all duration-300"
                    >
                        Sign In with Google
                    </button>
                </div>

                <div className="flex gap-1 mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    <p className="font-semibold">Already have an account?</p>
                    <Link to="/login" className="font-bold">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
