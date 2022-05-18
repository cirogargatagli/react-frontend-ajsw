import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import ImgLogin from "../../images/login.png"
import CustomInput from '../CustomInput';
import InputPassword from '../InputPassword';
import { useHistory } from "react-router-dom";
import { signIn } from '../../api/ApiAccount';
import { hash256 } from '../../utils/HashUtil';
import { AuthContext } from '../../context/AuthContext';
import { getPersonByEmail } from '../../api/ApiPerson';

const FormLogin = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { setUser, setToken } = useContext(AuthContext);

    const onSignIn = () => {
        setLoading(true);
        let body = {
            email: email,
            password: hash256(password)
        }
        signIn(body)
            .then(res => {
                getPersonByEmail(res.data.email)
                    .then(response => {
                        setUser(response.data);
                        history.push("/home")
                    })
                    .catch(err => {
                        setError(true);
                    })
                    .finally(() => {
                        setLoading(false);
                        return;
                    })
                setToken(hash256(res.data.email));
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            })
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
                <Grid item lg={12}>
                    <img
                        src={ImgLogin}
                        alt="imgLogin"
                        className='logo-login'
                    />
                </Grid>
                <Grid item>
                    <Typography>Sign In</Typography>
                </Grid>
                <Grid item>
                    <CustomInput
                        label="Email"
                        value={email}
                        setValue={setEmail}
                    />
                </Grid>
                <Grid item>
                    <InputPassword
                        password={password}
                        setPassword={setPassword}
                    />
                </Grid>
                {
                    loading && (
                        <Grid item>
                            <CircularProgress color="primary" />
                        </Grid>
                    )
                }
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={onSignIn}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                </Grid>
                {
                    error && (
                        <Grid item>
                            <Typography variant="subtitle2" color="red">
                                Email or password invalid
                            </Typography>

                        </Grid>
                    )
                }
                <Grid
                    container
                    direction="column"
                    padding={2}
                >
                    <Grid item>
                        <Button
                            variant='text'
                            color='primary'
                            onClick={() => history.push("/register")}
                        >
                            I don't have an account yet
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='text'
                            color='primary'
                        >
                            Forgot your password?
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default FormLogin;