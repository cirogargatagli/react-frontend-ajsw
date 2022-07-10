import React, { useState, createContext, useEffect } from "react";

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    const isAuthenticated = () => {
        return user && token;
    }

    const isAdmin = () => {
        return user.account.role.description === "Admin";
    }

    const isInstructor = () => {
        return user.account.role.description === "Instructor";
    }

    const isClient = () => {
        return user.account.role.description === "Client";
    }

    const defaultContext = {
        token, setToken,
        user, setUser,
        logOut,
        isAuthenticated,
        isAdmin, isInstructor, isClient
    }

    useEffect(() => {
        let userStorage = JSON.parse(localStorage.getItem("user"));
        let tokenStorage = JSON.parse(localStorage.getItem("token"));
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