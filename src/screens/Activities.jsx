import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getActivities } from '../api/ApiActivities';
import { FilterContext } from '../context/FilterContext';

const Activities = () => {

    const [activities, setActivities] = useState([]);

    const { setActivity } = useContext(FilterContext);

    const history = useHistory();

    useEffect(() => {
        getActivities()
            .then(res => {
                setActivities(res.data);
            })
            .catch(error => console.log(error))
    }, [])

    const onClickActivity = (activitie) => {
        setActivity(activitie);
        history.push("/courses");
    }

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                activities.length === 0 ? <CircularProgress />
                    :
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={4}>
                            {
                                activities.map((activitie) => (
                                    <Grid item key={activitie.idActivity} xs={12} sm={4} md={4}>
                                        <CardActionArea
                                            onClick={() => onClickActivity(activitie)}
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