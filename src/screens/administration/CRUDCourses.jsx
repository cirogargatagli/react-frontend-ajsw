
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteCourse, getFullCourses } from '../../api/ApiCourses';
import Loader from '../../components/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import { Action } from '../../components/ActionDataGrid';

const CRUDCourses = () => {

    const history = useHistory();

    const { setCourse } = useContext(CourseContext);

    const [coursesRow, setCoursesRow] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        setLoading(true);
        getFullCourses()
            .then(res => {
                setCourses(res.data);
                setCoursesRow(res.data.map(c => ({
                    ...c,
                    id: c.idCourse,
                    description: c.description,
                    instructor: c.instructor.firstName + " " + c.instructor.lastName,
                    activity: c.activity.description,
                    address: c.address.street + " " + c.address.numberHouse + ", " + c.address.locality.name,
                    day: c.day.nameDay,
                    capacity: c.capacity
                })))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const onEdit = (id) => {
        let cs = courses.find(c => c.idCourse === id);
        cs.instructor = {
            ...cs.instructor,
            id: cs.instructor.idInstructor
        }
        setCourse(cs);
        history.push("/add-course")
    }

    const onDelete = (id) => {
        deleteCourse(id)
            .then(res => {
                if (res.status === 200) {
                    setCourses(courses.filter(c => c.idCourse !== id))
                    setCoursesRow(coursesRow.filter(c => c.idCourse !== id))
                }
            })
            .catch(err => console.log(err))
    }

    const columns = [
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            minWidth: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Action type="edit" onAction={() => onEdit(params.row.id)} />
                        <Action type="delete" onAction={() => onDelete(params.row.id)} />
                    </div>
                );
            }
        },
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
            field: 'price',
            headerName: 'Price',
            minWidth: 100
        },
        {
            field: 'imageURL',
            headerName: 'Image',
            minWidth: 120
        },
        {
            field: 'instructor',
            headerName: 'Instructor',
            minWidth: 130
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
    );

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                loading ? <Loader />
                    :
                    <Box minWidth={minWidth + 10}>
                        <DataGrid
                            rows={coursesRow}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            autoHeight
                            style={{
                                minHeight: "371px"
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'tittle', sort: 'asc' }],
                                },
                            }}
                        />
                        <Grid container justifyContent="center">
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={loading}
                                onClick={() => history.push("/add-course")}
                                style={{ minWidth: "150px", marginTop: "20px" }}
                            >Add
                            </Button>
                        </Grid>

                    </Box>
            }
        </Grid>
    )
}

export default CRUDCourses;