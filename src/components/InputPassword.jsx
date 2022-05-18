import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'

const InputPassword = ({
    password,
    setPassword
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            variant='outlined'
            label="Password"
            name='password'
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
            }}
        />
    )
}

export default InputPassword;