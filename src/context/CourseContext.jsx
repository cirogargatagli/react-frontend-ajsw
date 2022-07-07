import React, { useState, createContext, useEffect } from "react";

export const CourseContextProvider = (props) => {
    const [course, setCourse] = useState(null);

    const defaultContext = {
        course, setCourse
    }


    return (
        <CourseContext.Provider value={defaultContext}>{props.children}</CourseContext.Provider>
    );
};

export const CourseContext = createContext();