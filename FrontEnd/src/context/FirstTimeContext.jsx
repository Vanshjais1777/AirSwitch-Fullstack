import React, { createContext, useState, useEffect, Children } from "react";

export const FirstTimeContext = createContext();

export const FirstTimeProvider = ({ children }) => {
    const [isFirstTime, setIsFirstTime] = useState(true);

    // On component mount, check if this is the first visit in the current session
    useEffect(() => {
        const firstVisitInSession = sessionStorage.getItem('firstVisitInSession');

        if (!firstVisitInSession) {
            // First visit in this session
            setIsFirstTime(true);
            sessionStorage.setItem('firstVisitInSession', 'false'); // Mark the session as "not first visit" after initial load
        } else {
            // Not the first visit in this session
            setIsFirstTime(false);
        }
    }, []);

    return (
        <FirstTimeContext.Provider value={{ isFirstTime, setIsFirstTime }}>
            {children}
        </FirstTimeContext.Provider>
    );
};