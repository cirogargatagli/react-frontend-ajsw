import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { capitalizeString } from '../../../utils/StringUtils';
import { Divider } from '@mui/material';

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review({
    course,
    payment
}) {

    const paymentDetails = [
        { name: 'Card type', detail: capitalizeString(payment.paymentMethodId) },
        { name: 'Card holder', detail: capitalizeString(payment.nameOnCard) },
        { name: 'Card number', detail: "xxxx-xxxx-xxxx-" + payment.cardNumber.substring(12, 16) },
        { name: 'Expiry date', detail: payment.expiryDate }
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                <b> Order summary</b>
            </Typography>
            <List disablePadding>
                <ListItem key={course.tittle} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={course.tittle} secondary={course.description} />
                    <Typography variant="body2">{"$ " + course.price}</Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {payment.installment.recommended_message}
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <Grid container spacing={2}>
                <Grid item container direction="column" xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        <b> Payment details</b>
                    </Typography>
                    <Grid container>
                        {paymentDetails.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ opacity: "0.7" }} gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}