import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider(props) {
    const [searchRequest, setRequest] = useState('');

    const setSearchRequest = (searchVal, selectDepartments, checkedInput) => {
        setRequest({ searchVal, selectDepartments, checkedInput });
    }

    return (
        <SearchContext.Provider value={{ searchRequest, setSearchRequest }}>
            {props.children}
        </SearchContext.Provider>
    )
}