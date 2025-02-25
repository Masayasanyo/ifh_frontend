import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [isAuth, setIsAuth] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initialAuthState = localStorage.getItem('isAuth');
        const initialUserData = localStorage.getItem('user_data');

        if (initialAuthState === 'true' && initialUserData) {
            try {
                setIsAuth(true);
                setUser(JSON.parse(initialUserData));
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
        else {
            setIsAuth(false);
        }
    }, []);

    const login = (userData) => {
        setIsAuth(true);
        setUser(userData);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user_data', JSON.stringify(userData));
    }

    const logout = () => {
        setIsAuth(false);
        setUser(null);
        localStorage.setItem('isAuth', 'false');
        localStorage.removeItem('user_data');
    };

    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{login, logout, isAuth, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
