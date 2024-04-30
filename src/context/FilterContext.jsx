import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
    return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const setCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <FilterContext.Provider value={{ selectedCategory, setCategory }}>
            {children}
        </FilterContext.Provider>
    );
};
