import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCourses } from '../../api/ApiCourses';
import MultipleSelectChip from '../../components/MultipleSelectChip';

const Courses = ({
    idActivity = 0,
    idLocality = 0
}) => {

    let history = useHistory();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses(idActivity, idLocality)
            .then(res => {
                setCourses(res.data);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                courses.length > 0 ?
                    <Container sx={{ py: 8 }} maxWidth="md">
                        {/* <Grid container justifyContent="center" >
                            <Grid item >
                                <MultipleSelectChip />
                            </Grid>
                        </Grid> */}

                        <Grid container paddingTop={8} spacing={4}>
                            {
                                courses.map((course) => (
                                    <Grid item key={course.idCourse} xs={4} sm={4} md={4}>
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
                                                    <Typography gutterBottom variant="h5" component="h2">
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
                    :
                    <CircularProgress />
            }
        </Grid>

    )
}

export default Courses;