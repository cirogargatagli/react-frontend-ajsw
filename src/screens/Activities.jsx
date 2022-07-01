import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { getActivities } from '../api/ApiActivities';

const Activities = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities()
            .then(res => {
                setActivities(res.data);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                activities.length === 0 ? <CircularProgress />
                    :
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {
                                activities.map((activitie) => (
                                    <Grid item key={activitie.idActivity} xs={4} sm={4} md={4}>
                                        <CardActionArea>
                                            <Card
                                                sx={{ height: '100%', maxHeight: "400px", display: 'flex', flexDirection: 'column' }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        height: "250px"
                                                        //16: 9
                                                    }}
                                                    image={activitie.imageURL}
                                                    alt={activitie.description}
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {activitie.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </CardActionArea>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
            }
        </Grid>

    )
}

export default Activities;