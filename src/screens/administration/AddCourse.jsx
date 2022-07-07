
import { Autocomplete, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getActivities } from '../../api/ApiActivities';
import { getLocalities } from '../../api/ApiAddress';
import { createCourse, updateCourse } from '../../api/ApiCourses';
import { getDays } from '../../api/ApiDays';
import { getInstructors } from '../../api/ApiInstructor';
import CustomInput from '../../components/CustomInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CourseContext } from '../../context/CourseContext';

const AddCourse = () => {

    const history = useHistory();

    const { course, setCourse } = useContext(CourseContext);

    const [loading, setLoading] = useState(false);

    const [tittle, setTittle] = useState(course ? course.tittle : "");
    const [description, setDescription] = useState(course ? course.description : "");
    const [capacity, setCapacity] = useState(course ? course.capacity : "");
    const [startTime, setStartTime] = useState(course ? course.startTime : "");
    const [endTime, setEndTime] = useState(course ? course.endTime : "");
    const [imageURL, setImageURL] = useState(course ? course.imageURL : "");
    const [price, setPrice] = useState(course ? course.price : "");

    const [day, setDay] = useState(course ? course.day : "");
    const [days, setDays] = useState([]);

    const [instructor, setInstructor] = useState(course ? course.instructor : "");
    const [instructors, setInstructors] = useState([]);

    const [activity, setActivity] = useState(course ? course.activity : null);
    const [activities, setActivities] = useState([]);


    const [street, setStreet] = useState(course ? course.address.street : "");
    const [numberHouse, setNumberHouse] = useState(course ? course.address.numberHouse : "");
    const [locality, setLocality] = useState(course ? course.address.locality : "");

    const [localities, setLocalities] = useState([]);

    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadActivities();
        loadLocalities();
        loadInstructors();
        loadDays();

        return () => {
            setCourse(null);
        }
    }, [])

    const loadActivities = () => {
        getActivities()
            .then((res) => {
                setActivities(res.data);
            })
            .catch(err => console.log(err))
    }

    const loadLocalities = () => {
        getLocalities()
            .then(res => {
                setLocalities(res.data);
            })
            .catch(err => console.log(err))
    }

    const loadInstructors = () => {
        getInstructors()
            .then(res => {
                setInstructors(res.data);
            })
            .catch(err => console.log(err))
    }

    const loadDays = () => {
        getDays()
            .then(res => {
                setDays(res.data);
            })
            .catch(err => console.log(err))
    }

    const changeBody = () => {
        return tittle !== course.tittle ||
            startTime !== course.startTime ||
            endTime !== course.endTime ||
            price !== course.price ||
            street !== course.address.street ||
            numberHouse !== course.address.numberHouse ||
            locality !== course.address.locality ||
            activity !== course.activity ||
            day !== course.day ||
            capacity !== course.capacity ||
            instructor !== course.instructor;

    }

    const validBody = () => {
        return tittle &&
            startTime &&
            endTime &&
            price &&
            street &&
            numberHouse &&
            locality &&
            instructor &&
            activity &&
            capacity &&
            (course ? changeBody() : true);
    }

    const onAdd = () => {
        let bodyCourse = {
            tittle,
            description,
            startTime: startTime,
            endTime: endTime,
            imageURL,
            price,
            idInstructor: instructor.idInstructor,
            idActivity: activity.idActivity,
            idDay: day.idDay,
            capacity,
            address: {
                street,
                numberHouse,
                idLocality: locality.idLocality
            }
        }

        createCourse(bodyCourse)
            .then(res => {
                setMessage({
                    error: false,
                    message: "Course successfully created"
                })
            })
            .catch(err => {
                setMessage({
                    error: true,
                    message: "Error creating course"
                })
            })
    }

    const onUpdate = () => {

        let bodyCourse = {
            id: course.idCourse,
            tittle,
            description,
            startTime: startTime,
            endTime: endTime,
            imageURL,
            price,
            capacity,
            idInstructor: instructor.idInstructor,
            idActivity: activity.idActivity,
            idDay: day.idDay,
            address: {
                street,
                numberHouse,
                idLocality: locality.idLocality
            }
        }

        updateCourse(bodyCourse)
            .then(res => {
                setMessage({
                    error: false,
                    message: "Course successfully update"
                })
            })
            .catch(err => {
                setMessage({
                    error: true,
                    message: "Error update course"
                })
            })
    }

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="95vh">
            <Paper elevation={2} className="paper-login">
                <Grid
                    container
                    direction="column"
                    textAlign="center"
                    padding={2}
                    paddingX={5}
                    rowSpacing={2}
                >
                    <Grid item>
                        <Typography variant="h5" color="primary">Complete the course information</Typography>
                    </Grid>
                    <Grid item>
                        <CustomInput
                            label="Course"
                            value={tittle}
                            setValue={setTittle}
                            required={true}
                        />
                    </Grid>

                    <Grid item lg={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Capacity"
                                    value={capacity}
                                    setValue={setCapacity}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Price"
                                    value={price}
                                    setValue={setPrice}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <CustomInput
                            label="Description"
                            value={description}
                            setValue={setDescription}
                        />
                    </Grid>

                    <Grid item>
                        <CustomInput
                            label="Image URL"
                            value={imageURL}
                            setValue={setImageURL}
                        />
                    </Grid>

                    <Grid item lg={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Start time"
                                    value={startTime}
                                    setValue={setStartTime}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="End time"
                                    value={endTime}
                                    setValue={setEndTime}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-days"
                            options={days}
                            onChange={(e, v) => setDay(v)}
                            defaultValue={day || null}
                            isOptionEqualToValue={(option, value) => option.idDay === value.idDay}
                            getOptionLabel={(option) => option.nameDay}
                            renderInput={(params) => <TextField {...params} label="Day" />}
                        />
                    </Grid>


                    <Grid item>
                        <Autocomplete
                            disablePortal
                            disableClearable={true}
                            id="combo-box-activities"
                            options={activities}
                            onChange={(e, v) => setActivity(v)}
                            defaultValue={activity || null}
                            getOptionLabel={(option) => option.description}
                            isOptionEqualToValue={(option, value) => option.idActivity === value.idActivity}
                            renderInput={(params) => <TextField {...params} label="Activity" />}
                        />

                    </Grid>
                    <Grid item lg={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Street"
                                    value={street}
                                    setValue={setStreet}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Number"
                                    value={numberHouse}
                                    setValue={setNumberHouse}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-localities"
                            options={localities}
                            onChange={(e, v) => setLocality(v)}
                            defaultValue={locality || null}
                            isOptionEqualToValue={(option, value) => option.idLocality === value.idLocality}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Locality" />}
                        />
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-instructors"
                            options={instructors}
                            onChange={(e, v) => setInstructor(v)}
                            defaultValue={instructor || null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.firstName + " " + option.lastName}
                            renderInput={(params) => <TextField {...params} label="Instructor" />}
                        />
                    </Grid>
                    {
                        loading && (
                            <Grid container justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Grid>
                        )
                    }
                    {
                        message && (
                            <Grid item>
                                <Typography color={message.error ? "red" : "green"}>{message.message}</Typography>
                            </Grid>
                        )
                    }

                    <Grid item>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    disabled={loading}
                                    onClick={history.goBack}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Back
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={loading || !validBody()}
                                    onClick={() => course ? onUpdate() : onAdd()}
                                >
                                    {
                                        !course ? "Add" : "Update"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Paper>
        </Grid>
    )
}

export default AddCourse;