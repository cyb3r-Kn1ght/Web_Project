import React, { createContext, useContext, useState } from 'react';
const usernameContext = createContext();
export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState('Hoang Long');
    return (
        <usernameContext.Provider value={{ username, setUsername }}>
            {children}
        </usernameContext.Provider>
    );
};
export const useUsername = () => {
    return useContext(usernameContext);
};
