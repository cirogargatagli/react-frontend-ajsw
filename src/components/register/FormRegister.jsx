import { Autocomplete, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../CustomInput';
import InputPassword from '../InputPassword';
import { useHistory } from "react-router-dom";
import { EMAIL, PHONE, STRING } from "../../utils/TypesUtils"
import { registerUser } from '../../api/ApiUser';
import { getLocalities } from '../../api/ApiAddress';

const FormRegister = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [locality, setLocality] = useState('');

    const [localities, setLocalities] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        loadLocalities();
    }, []);

    const loadLocalities = () => {
        getLocalities()
            .then(res => {
                setLocalities(res.data);
            })
            .catch(error => {
                setTimeout(() => {
                    loadLocalities();
                }, 10000);
            })
    }

    const onRegisterUser = () => {
        let bodyAccountUser = {
            email: email,
            password: password,
            active: true,
            id_role: 3
        }

        let bodyAddressUser = {
            street: street,
            number_house: number,
            locality: locality
        }

        let bodyUser = {
            firstName: firstName,
            lastName: surname
        }

        //postAddress

        //postAccount

        //postClient
    }

    return (
        <Paper elevation={10} className="paper-login" >
            <Grid
                container
                direction="column"
                textAlign="center"
                spacing={3}
                padding={2}
                paddingX={5}
            >
                <Grid item>
                    <Typography variant="h5" color="primary">Complete your information!</Typography>
                </Grid>
                <Grid item>
                    <CustomInput
                        label="Email*"
                        value={email}
                        setValue={setEmail}
                        type={EMAIL}
                        required={true}
                    />
                </Grid>
                <Grid item>
                    <InputPassword
                        password={password}
                        setPassword={setPassword}
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
                                type={STRING}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <CustomInput
                                label="Surname*"
                                value={surname}
                                setValue={setSurname}
                                type={STRING}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <CustomInput
                        label="Phone"
                        value={phone}
                        setValue={setPhone}
                        type={PHONE}
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
                                type={STRING}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <CustomInput
                                label="Number"
                                value={number}
                                setValue={setNumber}
                                type={STRING}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Autocomplete
                        disablePortal
                        id="combo-box-localities"
                        options={localities}
                        renderInput={(params) => <TextField {...params} label="Locality" />}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={onRegisterUser}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default FormRegister;