import React, { createContext, useState, useEffect } from 'react';

export const SpinnerContext = createContext();

export function SpinnerProvider(props) {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [isLoading]);

    return (
        <SpinnerContext.Provider value={{ isLoading, setLoading }}>
            {props.children}
        </SpinnerContext.Provider>
    )
}