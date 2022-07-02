import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';

const CourseDetail = ({
    course
}) => {

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight={400}>
            {
                course ?
                    <Grid container direction="column" paddingX={5} justifyContent="center">
                        <Grid container justifyContent="center">
                            <Grid item>
                                <img
                                    style={{ maxWidth: "150px" }}
                                    src={course.imageURL}
                                    alt={course.tittle}
                                />
                            </Grid>
                            <Grid item lg={12}>
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
                                        <Typography>
                                            <AttachMoneyIcon />
                                            {course.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <InfoIcon />
                                            {course.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <CircularProgress />
            }


        </Grid>

    )
}

export default CourseDetail;