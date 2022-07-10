
import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteCourse, getFullCourses } from '../../api/ApiCourses';
import Loader from '../../components/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import { Action } from '../../components/ActionDataGrid';
import { createActivity, deleteActivity, getActivities } from '../../api/ApiActivities';

const CRUDActivities = () => {

    const history = useHistory();

    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        description: ""
    })
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        setLoading(true);
        loadActivities();
    }, [])

    const loadActivities = () => {
        getActivities()
            .then((res) => {
                setActivities(res.data.map(a => ({ ...a, id: a.idActivity })));
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const addActivity = () => {
        setLoading(true);
        newActivity.description &&
            createActivity(newActivity)
                .then(res => {
                    setNewActivity({ description: "" })
                    loadActivities();
                })
                .catch(err => console.log(err))
    }

    const onDelete = (id) => {
        deleteActivity(id)
            .then(res => {
                if (res.status === 200) {
                    setActivities(activities.filter(c => c.idActivity !== id))
                }
            })
            .catch(err => console.log(err))
    }

    const columns = [
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            minWidth: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Action type="delete" onAction={() => onDelete(params.row.id)} />
                    </div>
                );
            }
        },
        {
            field: 'description',
            headerName: 'Name',
            minWidth: 270,
        },
    ];


    const minWidth = columns.reduce(
        (previousValue, currentValue) => previousValue + currentValue.minWidth,
        0
    );

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh" paddingY={2}>
            {
                loading ? <Loader />
                    :
                    <Box minWidth={minWidth + 10}>
                        <DataGrid
                            rows={activities}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            autoHeight
                            style={{
                                minHeight: "650px"
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'tittle', sort: 'asc' }],
                                },
                            }}
                        />
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    variant='outlined'
                                    label={"Activity"}
                                    name={newActivity}
                                    value={newActivity.description}
                                    onChange={e => setNewActivity({ description: e.target.value })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={loading}
                                    onClick={addActivity}
                                    style={{ width: "100%", minHeight: "" }}
                                >Add
                                </Button>
                            </Grid>

                        </Grid>

                    </Box>
            }
        </Grid>
    )
}

export default CRUDActivities;