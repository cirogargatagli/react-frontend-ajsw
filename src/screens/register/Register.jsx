import { Grid, Typography } from '@mui/material'
import React from 'react'
import FormRegister from '../../components/register/FormRegister'
import Logo from "../../images/logo.png"

const Register = () => {
    return (
        <Grid container direction="row" style={{ height: "100vh" }}>
            <Grid item lg={5} md={5} xs={0}>
                <div className='fondo-register'></div>
            </Grid>
            <Grid item lg={7} md={7} xs={12} style={{ alignItems: "center" }}>
                <Grid container
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    spacing={10}
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
                            This is the first step
                        </Typography>

                        <Typography
                            color="primary"
                            variant="h4"
                            fontWeight={500}
                        >
                            to live the best experiences
                        </Typography>
                    </Grid>

                    <Grid item lg={12} xl={12} md={12} xs={12}>
                        <FormRegister />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register;