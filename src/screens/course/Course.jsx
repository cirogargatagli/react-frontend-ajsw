import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../api/ApiCourses';
import Checkout from './checkout/Checkout';
import CourseDetail from './CourseDetail';

const Course = () => {

    let { id } = useParams();

    const [course, setCourse] = useState(null);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        getCourse(id)
            .then(res => {
                setCourse(res.data);
            })
            .catch(error => console.log(error));
    }, [])


    return (
        checkout ? <Checkout course={course} /> : <CourseDetail course={course} setCheckout={setCheckout} />
    )
}

export default Course;