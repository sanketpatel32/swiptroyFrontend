import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const jsonString = localStorage.getItem('currentUser');
        if (jsonString !== null) {
            const retrievedObject = JSON.parse(jsonString);
            setUserDetails(retrievedObject);
            setIsLoggedIn(true);
        }
    }, []); // Empty dependency array means this effect will run only once after the initial render

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
