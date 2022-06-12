import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import ItemCarousel from "../components/ItemCarousel"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imagesCarouselHome } from '../utils/ImagesCarousel';

const Home = () => {
    const courses = [1, 2, 3];

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
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {
                                courses.map((course) => (
                                    <Grid item key={course} xs={4} sm={4} md={4}>
                                        <Card
                                            sx={{ height: '100%', maxHeight: "400px", display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: "50%"
                                                    //16: 9
                                                }}
                                                image="https://source.unsplash.com/random"
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Heading
                                                </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the
                                                    content.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                                <Button size="small">Edit</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home;