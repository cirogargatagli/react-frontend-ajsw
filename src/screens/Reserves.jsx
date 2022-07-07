import { Box, Grid } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { getReserves } from '../api/ApiReserve';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
        field: 'nameCourse',
        headerName: 'Course',
        minWidth: 200,
    },
    {
        field: 'startTime',
        headerName: 'Start Course',
        minWidth: 150
    },
    {
        field: 'endTime',
        headerName: 'End Course',
        type: 'date',
        minWidth: 150
    },
    {
        field: 'createdAt',
        headerName: 'Reservation date',
        type: "date",
        minWidth: 150
    },
    {
        field: 'paymentProcessed',
        headerName: 'Payment state',
        minWidth: 130
    }
];

const minWidth = columns.reduce(
    (previousValue, currentValue) => previousValue + currentValue.minWidth,
    0
);


const Reserves = () => {

    const { user } = useContext(AuthContext);

    const [loadingReserves, setLoadingReserves] = useState(false);
    const [rows, setRows] = useState([])

    useEffect(() => {
        setLoadingReserves(true);
        getReserves(user.id)
            .then(res => {
                setRows(res.data.map(r => ({
                    id: r.idReserve,
                    nameCourse: r.course.tittle,
                    startTime: r.course.startTime,
                    endTime: r.course.endTime,
                    createdAt: r.createdAt.split("T")[0],
                    paymentProcessed: r.payment.isProcessed ? "✓" : "X"
                })))
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingReserves(false))
    }, [])


    return (
        <Grid container minHeight="80vh" justifyContent="center" alignItems="center">
            {
                loadingReserves ? <Loader />
                    :
                    rows.length > 0 &&
                    <Box minWidth={minWidth + 10}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </Box>
            }
        </Grid>

    )
}

export default Reserves;