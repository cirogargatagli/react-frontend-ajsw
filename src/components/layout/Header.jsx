
import { Grid } from '@mui/material';
import React from 'react'
import Logo from '../../images/logo.png'

const Header = () => {
    return (
        <Grid container direction="row" className='header'>
            <Grid item lg={1} md={2} xs={3}>
                <img
                    src={Logo}
                    alt='logo'
                    className='logo-header'
                />
            </Grid>
            Header
        </Grid>
    )
}

export default Header;