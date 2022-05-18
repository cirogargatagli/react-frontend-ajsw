import React, { useState, createContext, useEffect } from "react";

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const defaultContext = {
        token, setToken,
        user, setUser
    }

    useEffect(() => {
        let userStorage = localStorage.getItem("user");
        let tokenStorage = localStorage.getItem("token");
        if (user && token && !userStorage && !tokenStorage) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(token));

        }

        if (!user && !token) {
            setUser(userStorage);
            setToken(tokenStorage);
        }
    }, [user, token])


    return (
        <AuthContext.Provider value={defaultContext}>{props.children}</AuthContext.Provider>
    );
};

export const AuthContext = createContext();