import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAddStoryModalOpen , setIsAddStoryModalOpen] = useState(false);
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isRegisterModalOpen, setIsRegisterModalOpen, isLoginModalOpen, setIsLoginModalOpen, isAddStoryModalOpen, setIsAddStoryModalOpen, isStoryModalOpen, setIsStoryModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;