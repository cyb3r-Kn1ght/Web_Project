import React, { createContext, useContext, useState } from "react";
const SelectedCelebContext = createContext();
export const SelectedCelebProvider = ({ children }) => {
    const [selectedCeleb, setSelectedCeleb] = useState(null);
    const [messageHistory, setMessageHistory] = useState({});
    return (
        <SelectedCelebContext.Provider
            value={{ selectedCeleb, setSelectedCeleb, messageHistory, setMessageHistory }}
        >
            {children}
        </SelectedCelebContext.Provider>
    );
}
export const useSelectedCeleb = () => useContext(SelectedCelebContext);