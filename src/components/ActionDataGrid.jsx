import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControlLabel, IconButton } from '@mui/material';

export const Action = ({ onAction, type }) => {

    const getIcon = {
        delete: <DeleteIcon style={{ color: "red" }} />,
        edit: <EditIcon color="primary" />
    }

    return (
        <FormControlLabel
            control={
                <IconButton
                    color="secondary"
                    aria-label="add an alarm"
                    onClick={onAction}
                >
                    {getIcon[type]}
                </IconButton>
            }
        />
    );
};