import { Grid, Typography } from '@mui/material'
import React from 'react'
import FormLogin from '../../components/login/FormLogin';
import Logo from "../../images/logo.png"

const Login = () => {
    return (
        <Grid container direction="row" style={{ height: "100vh" }}>
            <Grid item lg={5} md={5} xs={0}>
                <div className='fondo-login'></div>
            </Grid>
            <Grid item lg={7} md={7} xs={12} style={{ alignItems: "center" }}>
                <Grid container
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    spacing={10}
                    paddingY={4}
                >
                    <Grid item lg={12} xl={12} md={12} xs={12}>
                        <img
                            src={Logo}
                            alt='logo'
                            className='logo-principal-login'
                        />

                        <Typography
                            color="primary"
                            variant="h4"
                            fontWeight={500}
                        >
                            ¡Welcome to
                        </Typography>

                        <Typography
                            color="primary"
                            variant="h4"
                            fontWeight={500}
                        >
                            the activity portal!
                        </Typography>
                    </Grid>

                    <Grid item lg={12} xl={12} md={12} xs={12}>
                        <FormLogin />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;