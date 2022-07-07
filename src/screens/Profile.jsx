import { Autocomplete, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getLocalities } from '../api/ApiAddress';
import { getPersonByEmail, updatePerson } from '../api/ApiPerson';
import CustomInput from '../components/CustomInput';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState(user.account.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [surname, setSurname] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [street, setStreet] = useState(user.address.street);
    const [number, setNumber] = useState(user.address.numberHouse);
    const [locality, setLocality] = useState({ name: user.address.locality.name, idLocality: user.address.locality.id });
    const [localities, setLocalities] = useState([]);
    const [message, setMessage] = useState(null);
    // const [role, setRole] = useState({ idRole: user.account.role.id, description: user.account.role.description });
    // const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLocalities();
    }, [])

    const loadLocalities = () => {
        getLocalities()
            .then(res => {
                setLocalities(res.data);
            })
            .catch(error => {
                // setTimeout(() => {
                //     loadLocalities();
                // }, 10000);
            })
    }

    // const loadRoles = () => {
    //     getRoles()
    //         .then(res => {
    //             setRoles(res.data);
    //         })
    //         .catch(err => console.log(err))
    // }

    const validBody = () => {
        let changeBody = email !== user.account.email
            || firstName !== user.firstName
            || surname !== user.lastName
            || phone !== user.phone
            || street !== user.address.street
            || number !== user.address.numberHouse
            || locality.idLocality !== user.address.locality.id;
        return email && firstName && surname && phone && street && number && locality && changeBody;
    }

    const updateUser = () => {
        setMessage(null);
        setLoading(true);
        let bodyUser = {
            firstName,
            lastName: surname,
            phone,
            addressRequest: {
                street,
                numberHouse: number,
                idLocality: locality.idLocality
            },
            accountRequest: {
                email,
                active: true,
                id_role: 3
            }
        }

        updatePerson(bodyUser)
            .then(res => {
                getPersonByEmail(bodyUser.accountRequest.email)
                    .then(res => {
                        setUser(res.data);
                        setMessage({ error: false, message: "Successfully updated user" });
                    })
            })
            .catch(err => setMessage({ error: true, message: "Failed to update user" }))
            .finally(() => setLoading(false))
    }

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
            <Paper elevation={2} className="paper-login">
                <Grid
                    container
                    direction="column"
                    textAlign="center"
                    padding={2}
                    paddingX={5}
                    rowSpacing={2}
                >
                    <Grid item>
                        <Typography variant="h5" color="primary">Update your information</Typography>
                    </Grid>
                    <Grid item>
                        <CustomInput
                            label="Email*"
                            value={email}
                            setValue={setEmail}
                            required={true}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="First name*"
                                    value={firstName}
                                    setValue={setFirstName}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Surname*"
                                    value={surname}
                                    setValue={setSurname}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <CustomInput
                            label="Phone"
                            value={phone}
                            setValue={setPhone}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Street"
                                    value={street}
                                    setValue={setStreet}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                                <CustomInput
                                    label="Number"
                                    value={number}
                                    setValue={setNumber}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-localities"
                            options={localities}
                            onChange={(e, v) => setLocality(v)}
                            defaultValue={locality}
                            isOptionEqualToValue={(option, value) => option.idLocality === value.idLocality}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Locality" />}
                        />
                    </Grid>
                    {/* <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-roles"
                            options={roles}
                            onChange={(e, v) => setRole(v)}
                            defaultValue={role}
                            isOptionEqualToValue={(option, value) => option.idRole === value.idRole}
                            getOptionLabel={(option) => option.description}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                        />
                    </Grid> */}
                    {
                        loading && (
                            <Grid container justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Grid>
                        )
                    }
                    {
                        message && (
                            <Grid item>
                                <Typography color={message.error ? "red" : "green"}>{message.message}</Typography>
                            </Grid>
                        )
                    }

                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={!validBody() || loading}
                            onClick={() => updateUser()}
                        >
                            Update
                        </Button>
                    </Grid>
                    {/* <Grid item>
                    <Snackbar
                        open={openSnackbar.open}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackbar({})}
                        message={openSnackbar.message}
                    />
                </Grid> */}
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Profile;