import { Autocomplete, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomInput from '../CustomInput';
import InputPassword from '../InputPassword';
import { useHistory } from "react-router-dom";
import { EMAIL, PHONE, STRING } from "../../utils/TypesUtils"
import { getLocalities, postAddress } from '../../api/ApiAddress';
import { postAccount } from '../../api/ApiAccount';
import { createPerson } from '../../api/ApiPerson';
import { hash256 } from '../../utils/HashUtil';

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
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({});

    useEffect(() => {
        loadLocalities();
    }, []);

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

    const onRegisterUser = async () => {
        setLoading(true);
        let bodyAccountUser = {
            email: email,
            password: hash256(password),
            active: true,
            id_role: 3
        }

        let idAccount = await postAccount(bodyAccountUser)
            .then(res => {
                return res.data.id;
            })
            .catch(err => {
                console.log(err)
            })

        let bodyAddressUser = {
            street: street,
            numberHouse: number,
            idLocality: locality.idLocality
        }

        let idAddress = await postAddress(bodyAddressUser)
            .then(res => {
                return res.data.id;
            })
            .catch(err => {
                console.log(err)
            })

        let bodyUser = {
            firstName: firstName,
            lastName: surname,
            phone: phone,
            idAddress: idAddress,
            idAccount: idAccount
        }

        createPerson(bodyUser)
            .then(() => {
                setOpenSnackbar({ open: true, severity: "success", message: "You registered successfully, you can now log in" });
                setTimeout(() => {
                    history.push("/login")
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setOpenSnackbar({ open: true, severity: "error", message: "An error occurred while registering" });
            })
            .finally(() => {
                setLoading(false);

            })
    }

    const validBody = () => {
        return email && password && firstName && surname && phone && street && number && locality;
    }

    return (
        <Paper elevation={2} className="paper-login" >
            <Grid
                container
                direction="column"
                textAlign="center"
                padding={2}
                paddingX={5}
                rowSpacing={2}
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
                        onChange={(e, v) => setLocality(v)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Locality" />}
                    />
                </Grid>
                {
                    loading && (
                        <CircularProgress color="primary" />
                    )
                }
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={onRegisterUser}
                        disabled={!validBody() || loading}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item>
                    <Snackbar
                        open={openSnackbar.open}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackbar({})}
                        message={openSnackbar.message}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default FormRegister;