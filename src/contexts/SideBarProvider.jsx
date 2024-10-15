import { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const value = { isOpen, setIsOpen, type, setType };
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};
