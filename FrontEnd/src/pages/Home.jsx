import React, { useContext, useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { AuthContext } from '../context/AuthContext';
import SignUp from './SIgnUp';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { isFirstTime, setIsFirstTime, isLoggedIn } = useContext(AuthContext);
    const [showLogo, setShowLogo] = useState(isFirstTime);
    const navigate = useNavigate();

    useEffect(() => {
        if (showLogo) {
            // Show logo for 2 seconds
            const timer = setTimeout(() => {
                setShowLogo(false);
                setIsFirstTime(false); // Update context after logo is shown
                localStorage.setItem('isFirstTime', 'false'); // Persist this in localStorage
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showLogo, setIsFirstTime]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/masters'); // Redirect to Masters if already logged in
        }
    }, [isLoggedIn, navigate]);

    if (showLogo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Logo />
            </div>
        );
    }

    // If not logged in and logo is hidden, show signup
    return !isLoggedIn && !showLogo ? <SignUp /> : null;
};

export default Home;