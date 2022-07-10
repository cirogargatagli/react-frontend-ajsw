import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import ItemCarousel from "../components/ItemCarousel"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imagesCarouselHome } from '../utils/ImagesCarousel';
import { useEffect } from 'react';
import { getMostReserved } from '../api/ApiCourses';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import StarIcon from '@mui/icons-material/Star';
import Logo from "../images/logo.png";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {

    const history = useHistory();

    const { isClient } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadMostReserved();
    }, [])

    const loadMostReserved = () => {
        getMostReserved()
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <Grid container direction="column" justifyContent="center" textAlign="center">
            <Grid item>
                <Paper>
                    <Carousel
                        autoPlay
                        infiniteLoop
                        emulateTouch
                        showStatus={false}
                        showThumbs={false}
                        interval={5000}
                    >
                        {
                            imagesCarouselHome.map((img, key) => {
                                return <ItemCarousel key={key} item={img} />
                            })
                        }
                    </Carousel>
                    {
                        isClient() &&
                        <Container sx={{ py: 4 }} maxWidth="md">
                            <Paper sx={{ padding: "10px" }}>
                                <Typography variant='h4' color="primary" textAlign="left"><StarIcon /> Most reserved</Typography>
                                <Grid container spacing={4} sx={{ py: 4 }}>
                                    {
                                        courses.length > 0 ?
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
                                                                image={course.imageURL || Logo}
                                                                alt="random"
                                                            />
                                                            <CardContent sx={{ flexGrow: 1 }}>
                                                                <Typography gutterBottom variant="h5" component="h2" fontWeight="550">
                                                                    {course.tittle}
                                                                </Typography>
                                                                <Typography gutterBottom variant="h6" component="h2">{course.day.nameDay}</Typography>
                                                                <Typography gutterBottom variant="h6" component="h2">
                                                                    {course.startTime.split(":")[0] + ":" + course.startTime.split(":")[1] + " - " + course.endTime.split(":")[0] + ":" + course.endTime.split(":")[1]}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </CardActionArea>
                                                </Grid>
                                            ))
                                            :
                                            <Loader />
                                    }
                                </Grid>
                            </Paper>
                        </Container>
                    }
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home;