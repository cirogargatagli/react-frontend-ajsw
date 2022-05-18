
import { Grid } from '@mui/material';
import React from 'react'
import Footer from './Footer';
import Header from './Header';

const Layout = ({
    children
}) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                {children}
            </Grid>
            <Grid item>
                <Footer />
            </Grid>
        </Grid>
    )
}

export default Layout;