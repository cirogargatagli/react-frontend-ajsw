import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

const CourseDetail = ({
    course,
    setCheckout
}) => {

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh" >
            {
                course ?
                    <Paper>
                        <Grid container direction="column" paddingX={5} minHeight={400} minWidth={1000} justifyContent="center">
                            <Grid container justifyContent="center">
                                <Grid item lg={3}>
                                    <img
                                        style={{ maxWidth: "250px" }}
                                        src={course.imageURL}
                                        alt={course.tittle}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <Grid container direction="column" justifyContent="center" alignContent="center" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h4">
                                                {course.tittle}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                <CalendarMonthIcon />
                                                {course.startTime + " - " + course.endTime}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                <LocationOnIcon />
                                                {course.address.street + " " + course.address.numberHouse + ", " + course.address.locality.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                <PersonIcon />
                                                {course.instructor.firstName + " " + course.instructor.lastName}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1">
                                                {course.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container direction="column">
                                                <Grid item marginTop={1} lg={12}>
                                                    <Typography variant="inherit" color="primary">
                                                        {"$" + course.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={() => setCheckout(true)}
                                                    >
                                                        Reserve
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    :
                    <CircularProgress />
            }


        </Grid>

    )
}

export default CourseDetail;