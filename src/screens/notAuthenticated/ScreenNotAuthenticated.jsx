import { Grid, Typography } from '@mui/material'
import React from 'react'
import Logo from "../../images/logo.png"

const ScreenNotAuthenticated = ({
    props
}) => {

    return (
        <Grid container direction="row" style={{ height: "100vh" }}>
            <Grid item lg={5} md={5} xs={0}>
                <div className={props.classBackground}></div>
            </Grid>
            <Grid item lg={7} md={7} xs={12} style={{ alignItems: "center" }}>
                <Grid container
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    paddingY={4}
                    rowSpacing={5}
                >
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid item lg={2}>
                                <img
                                    src={Logo}
                                    alt='logo'
                                    className='logo-principal-login'
                                />
                            </Grid>

                            <Grid item>
                                <Typography
                                    color="primary"
                                    variant="h4"
                                    fontWeight={500}
                                >
                                    {props.title1}
                                </Typography>
                            </Grid>

                            <Grid item lg={12} xl={12} md={12} xs={12}>
                                <Typography
                                    color="primary"
                                    variant="h4"
                                    fontWeight={500}
                                >
                                    {props.title2}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} xl={12} md={12} xs={12} >
                        {props.form}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ScreenNotAuthenticated;