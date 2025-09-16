import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);
    const value = { showSearch, setShowSearch };
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
