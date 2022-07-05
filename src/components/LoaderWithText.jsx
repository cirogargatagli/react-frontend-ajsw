import { CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";

const Loader = ({
    text
}) => {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography variant="h6">{text}</Typography>
            <CircularProgress />
        </Grid>
    );
}

export default Loader;