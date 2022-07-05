import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const Loader = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
        </Grid>
    );
}

export default Loader;