import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getCoursesByInstructor } from '../../api/ApiInstructor';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyCourses = () => {

    const history = useHistory();

    const { user } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        getCoursesByInstructor(user.id)
            .then(res => {
                setCourses(res.data.map(c => ({
                    ...c,
                    id: c.idCourse,
                    description: c.description,
                    activity: c.activity.description,
                    address: c.address.street + " " + c.address.numberHouse + ", " + c.address.locality.name,
                    day: c.day.nameDay,
                    capacity: c.capacity,
                    students: c.reservesCount
                })))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const columns = [
        {
            field: 'tittle',
            headerName: 'Course',
            minWidth: 270,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 300,
        },
        {
            field: 'day',
            headerName: 'Day',
            minWidth: 100
        },
        {
            field: 'startTime',
            headerName: 'Start Course',
            minWidth: 100
        },
        {
            field: 'endTime',
            headerName: 'End Course',
            type: 'date',
            minWidth: 100
        },
        {
            field: 'capacity',
            headerName: 'Capacity',
            minWidth: 100
        },
        {
            field: 'students',
            headerName: 'Students',
            minWidth: 100
        },
        {
            field: 'price',
            headerName: 'Price',
            minWidth: 100
        },
        {
            field: 'activity',
            headerName: 'Activity',
            minWidth: 110
        },
        {
            field: 'address',
            headerName: 'Address',
            minWidth: 250
        },
    ];

    const minWidth = columns.reduce(
        (previousValue, currentValue) => previousValue + currentValue.minWidth,
        0
    ) + 10;

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                loading ? <Loader />
                    :
                    <Box minWidth={minWidth}>
                        <DataGrid
                            rows={courses}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            autoHeight
                            style={{
                                minHeight: "631px"
                            }}
                        />
                    </Box>
            }
        </Grid>
    )
}

export default MyCourses;