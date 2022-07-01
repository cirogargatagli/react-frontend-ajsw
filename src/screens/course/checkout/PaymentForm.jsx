import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PaymentForm({
    course
}) {

    const [nameOnCard, setNameOnCard] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [errorCard, setErrorCard] = useState(null);

    const [expiryDate, setExpiryDate] = useState("");

    const [paymentMethodId, setPaymentMethodId] = useState("");

    const [issuers, setIssuers] = useState([]);
    const [issuer, setIssuer] = useState("");

    const [installments, setInstallments] = useState([]);
    const [installment, setInstallment] = useState("");


    useEffect(() => {
        if (cardNumber.length >= 6) {
            setErrorCard(null);
            window.Mercadopago.getPaymentMethod({
                "bin": cardNumber.substring(0, 6)
            }, setPaymentMethod)
        } else {
            setIssuers([]);
        }
    }, [cardNumber])

    useEffect(() => {
        if (expiryDate.length === 2 && !expiryDate.includes("/")) {
            setExpiryDate(expiryDate + "/")
        }
        // if (expiryDate.includes("/")) {
        //     expiryDate.length <= 2 && setExpiryDate(expiryDate.replace(expiryDate[2], ""))
        // } else {
        //     if (expiryDate.length > 2) {
        //         setExpiryDate(expiryDate.replace(expiryDate[2], "/"))
        //     }
        // }
    }, [expiryDate])

    useEffect(() => {
        issuer ? getInstallments() : setInstallments([]);
    }, [issuer])

    const setPaymentMethod = (status, response) => {
        if (status === 200) {
            let paymentMethod = response[0];
            setPaymentMethodId(paymentMethod.id);
            getIssuers(paymentMethod.id);
        } else {
            setErrorCard("Invalid card");
            //alert(`payment method info error: ${response}`);
        }
    }

    const getIssuers = (paymentMethodId) => {
        window.Mercadopago.getIssuers(
            paymentMethodId,
            updateIssuers
        );
    }

    const updateIssuers = (status, response) => {
        if (status === 200) {
            setIssuers(response);
        } else {
            alert(`issuers method info error: ${response}`);
        }
    }

    const getInstallments = () => {
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(course.price),
            "issuer_id": parseInt(issuer.id)
        }, updateInstallments);
    }

    const updateInstallments = (status, response) => {
        if (status === 200) {
            setInstallments(response[0].payer_costs)
        } else {
            alert(`installments method info error: ${response}`);
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        value={nameOnCard}
                        onChange={e => setNameOnCard(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        error={errorCard}
                        helperText={errorCard}
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        variant="standard"
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                        inputProps={{ maxLength: 5 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                {
                    issuers.length > 0 &&
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-issuers"
                            options={issuers}
                            onChange={(e, v) => setIssuer(v)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Issuer" variant="standard" />}
                        />
                    </Grid>
                }
                {
                    installments.length > 0 &&
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-installments"
                            options={installments}
                            onChange={(e, v) => setInstallment(v)}
                            getOptionLabel={(option) => option.recommended_message}
                            renderInput={(params) => <TextField {...params} label="Installments" variant="standard" />}
                        />
                    </Grid>
                }
            </Grid>
        </React.Fragment>
    );
}