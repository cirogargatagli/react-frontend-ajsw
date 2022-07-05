import React, { useState, createContext } from "react";

export const FilterContextProvider = (props) => {
    const defaultLocality = { idLocality: 0, name: "All" };
    const defaultActivity = { idActivity: 0, description: "All" };

    const [activity, setActivity] = useState(defaultActivity);
    const [locality, setLocality] = useState(defaultLocality);




    const defaultContext = {
        defaultLocality, defaultActivity,
        activity, setActivity,
        locality, setLocality
    }

    return (
        <FilterContext.Provider value={defaultContext}>{props.children}</FilterContext.Provider>
    );
};

export const FilterContext = createContext();