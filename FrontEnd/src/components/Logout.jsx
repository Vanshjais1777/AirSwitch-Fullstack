import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    return <button onClick={logout}>Logout</button>;
};

export default Logout;
