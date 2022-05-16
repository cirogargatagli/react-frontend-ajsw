import { TextField } from '@mui/material';
import React from 'react'
import { EMAIL, PHONE, STRING } from '../utils/TypesUtils';
import validator from 'validator'

const CustomInput = ({
    label,
    value,
    setValue,
    type
}) => {

    const onChange = (value) => {
        switch (type) {
            case STRING:
                setValue(value.replace(/[^a-zA-Z]/g, ""))
                break;
            case EMAIL:
                break;
            case PHONE:
                break;

            default:
                break;
        }
    }

    return (
        <TextField
            variant='outlined'
            label={label}
            name={label}
            value={value}
            type={type}
            onChange={e => setValue(e.target.value)}
            fullWidth
        />
    )
}

export default CustomInput;