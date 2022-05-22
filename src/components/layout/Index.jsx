
import { Grid } from '@mui/material';
import React from 'react'
import Footer from './Footer';
import Header from './header/Header';

const Layout = ({
    children
}) => {
    return (
        <Grid container direction="column" style={{ minHeight: "100vh" }}>
            <Grid item>
                <Header />
            </Grid>
            <Grid item style={{ minHeight: "82vh" }}>
                {children}
            </Grid>
            <Grid item>
                <Footer />
            </Grid>
        </Grid>
    )
}

export default Layout;