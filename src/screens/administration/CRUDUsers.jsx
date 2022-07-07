
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getFullCourses } from '../../api/ApiCourses';
import Loader from '../../components/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers } from '../../api/ApiPerson';

const columns = [
    {
        field: 'name',
        headerName: 'Full name',
        minWidth: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
        minWidth: 250
    },
    {
        field: 'role',
        headerName: 'Role',
        minWidth: 120
    },
    {
        field: 'phone',
        headerName: 'Phone',
        minWidth: 200,
    },
    {
        field: 'address',
        headerName: 'Address',
        minWidth: 250
    },
];

const minWidth = columns.reduce(
    (previousValue, currentValue) => previousValue + currentValue.minWidth,
    0
) + 10;

const CRUDUsers = () => {

    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then(res => setUsers(res.data.map(u => ({
                ...u,
                name: u.firstName + " " + u.lastName,
                address: u.address ? u.address.street + " " + u.address.numberHouse + ", " + u.address.locality.name : "",
                email: u.account.email,
                role: u.account.role ? u.account.role.description : "",

            }))))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            {
                loading ? <Loader />
                    :
                    <Box minWidth={minWidth}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </Box>
            }

        </Grid>
    )
}

export default CRUDUsers;