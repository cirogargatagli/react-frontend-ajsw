import { Autocomplete, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getActivities } from '../../api/ApiActivities';
import { getLocalities } from '../../api/ApiAddress';
import { getCourses } from '../../api/ApiCourses';
import { AuthContext } from '../../context/AuthContext';
import { FilterContext } from '../../context/FilterContext';

const Courses = () => {

    let history = useHistory();

    const [courses, setCourses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [localities, setLocalities] = useState([]);

    const [loadingCourses, setLoadingCourses] = useState(false);

    const { activity, locality, setActivity, setLocality, defaultActivity, defaultLocality } = useContext(FilterContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadCourses();
        loadActivities();
        loadLocalities();
        return () => {
            setActivity(defaultActivity);
            setLocality(defaultLocality);
        }
    }, [])

    useEffect(() => {
        loadCourses();
    }, [activity, locality])

    const loadCourses = () => {
        setLoadingCourses(true);
        getCourses(activity.idActivity, locality.idLocality)
            .then(res => {
                setCourses(res.data);
            })
            .catch(error => console.log(error))
            .finally(() => setLoadingCourses(false))
    }

    const loadActivities = () => {
        getActivities()
            .then((res) => {
                let acts = res.data;
                acts.unshift(defaultActivity);
                setActivities(acts)
            })
            .catch(err => console.log(err))
    }

    const loadLocalities = () => {
        getLocalities()
            .then(res => {
                let locs = res.data;
                locs.unshift(defaultLocality);
                let modifyLocs = locs.map(l => (l.name === user.address.locality.name ? { ...l, name: "⋆ My locality" } : l))
                setLocalities(modifyLocs);
            })
            .catch(err => console.log(err))
    }

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            <Container sx={{ py: 8 }} maxWidth="md">
                <Paper>
                    {/* <Typography marginLeft={1} marginTop={5}><i>Filter</i></Typography> */}
                    <Grid container justifyContent="center" spacing={2} minHeight={100}>
                        {
                            localities.length > 0 && (
                                <Grid item md={4} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        disableClearable={true}
                                        id="combo-box-localities"
                                        options={localities}
                                        defaultValue={locality}
                                        onChange={(e, v) => setLocality(defaultLocality)}
                                        isOptionEqualToValue={(option, value) => option.idLocality === value.idLocality}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Locality" />}
                                    />
                                </Grid>
                            )
                        }
                        {
                            activities.length > 0 && (
                                <Grid item md={4} xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        disableClearable={true}
                                        id="combo-box-activities"
                                        options={activities}
                                        onChange={(e, v) => setActivity(v)}
                                        defaultValue={activity}
                                        getOptionLabel={(option) => option.description}
                                        isOptionEqualToValue={(option, value) => option.idActivity === value.idActivity}
                                        renderInput={(params) => <TextField {...params} label="Activity" />}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Paper>

                <Grid container paddingTop={8} spacing={4} justifyContent={loadingCourses ? "center" : "start"} minHeight="60vh">
                    {
                        loadingCourses ? <Grid item> <CircularProgress /> </Grid>
                            :
                            courses.map((course) => (
                                <Grid item key={course.idCourse} xs={12} sm={4} md={4}>
                                    <CardActionArea
                                        onClick={() => history.push("/courses/" + course.idCourse)}
                                    >
                                        <Card
                                            sx={{ height: '100%', maxHeight: "400px", display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: "250px"
                                                    //16: 9
                                                }}
                                                image={course.imageURL}
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2" fontWeight="550">
                                                    {course.tittle}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="h2">
                                                    {course.startTime + " - " + course.endTime}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            ))
                    }
                </Grid>


            </Container>
        </Grid >

    )
}

export default Courses;