import React, {createContext, useContext, useState} from "react";
const SelectedAvatarContext = createContext();
export const SelectedAvatarProvider = ({children}) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    return (
        <SelectedAvatarContext.Provider value={{selectedAvatar, setSelectedAvatar}}>
            {children}
        </SelectedAvatarContext.Provider>
    );
};
export const useSelectedAvatar = () => useContext(SelectedAvatarContext);