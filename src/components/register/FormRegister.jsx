import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomInput from '../CustomInput';
import InputPassword from '../InputPassword';
import { useHistory } from "react-router-dom";
import { EMAIL, PHONE, STRING } from "../../utils/TypesUtils"
import { registerUser } from '../../api/ApiUser';

const FormRegister = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const onRegisterUser = () => {
        let bodyAccount = {
            email: email,
            password: password,
            active: true,
            id_role: 3
        }



        let bodyUser = {
            firstName: firstName,
            lastName: surname
        }

        alert(bodyAccount)
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
                <Grid item>
                    <CustomInput
                        label="First name*"
                        value={firstName}
                        setValue={setFirstName}
                        type={STRING}
                    />
                </Grid>
                <Grid item>
                    <CustomInput
                        label="Surname*"
                        value={surname}
                        setValue={setSurname}
                        type={STRING}
                    />
                </Grid>
                <Grid item>
                    <CustomInput
                        label="Phone"
                        value={phone}
                        setValue={setPhone}
                        type={PHONE}
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