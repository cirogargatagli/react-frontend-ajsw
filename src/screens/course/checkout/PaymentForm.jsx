import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { initializeMP } from '../../../utils/MP/MPUtils';
import Loader from '../../../components/Loader'

export default function PaymentForm({
    course,
    form,
    setForm,
    errorPayment,
    setErrorPayment
}) {
    const [errorCard, setErrorCard] = useState(null);
    const [optionsAutocompletes, setOptionsAutocompletes] = useState({
        identificationTypes: [],
        installments: [],
        issuers: []
    })

    useEffect(() => {
        initializeMP();
        window.Mercadopago.getIdentificationTypes((status, response) => {
            if (status === 200) {
                setOptionsAutocompletes(preState => ({
                    ...preState,
                    identificationTypes: response
                }))
            }
        })
        return () => {
            setErrorPayment("");
        }
    }, [])

    useEffect(() => {
        if (form.cardNumber.length >= 6) {
            setErrorCard(null);
            window.Mercadopago.getPaymentMethod({
                "bin": form.cardNumber.substring(0, 6)
            }, setPaymentMethod)
        } else {
            setOptionsAutocompletes((preState) => ({
                ...preState,
                issuers: []
            }))
        }
    }, [form.cardNumber])

    useEffect(() => {
        form.issuer ?
            getInstallments()
            :
            setOptionsAutocompletes((preState) => ({
                ...preState,
                issuers: []
            }))
    }, [form.issuer])

    const setPaymentMethod = (status, response) => {
        if (status === 200) {
            let paymentMethod = response[0];
            setForm((preState) => ({
                ...preState,
                paymentMethodId: paymentMethod.id
            }))
            getIssuers(paymentMethod.id);
        } else {
            setErrorCard("Invalid card");
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
            setOptionsAutocompletes((preState) => ({
                ...preState,
                issuers: response
            }))
        } else {
            alert(`issuers method info error: ${response}`);
        }
    }

    const getInstallments = () => {
        window.Mercadopago.getInstallments({
            "payment_method_id": form.paymentMethodId,
            "amount": parseFloat(course.price),
            "issuer_id": parseInt(form.issuer.id)
        }, updateInstallments);
    }

    const updateInstallments = (status, response) => {
        if (status === 200) {
            setOptionsAutocompletes((preState) => ({
                ...preState,
                installments: response[0].payer_costs
            }))
        } else {
            alert(`installments method info error: ${response}`);
        }
    }

    const handleChange = (e, v) => {
        const { name, value } = e.target;

        let nameAux = name ? name : optionsAutocompletes.ref.current.getAttribute("name");
        let valueAux = v ? v : getValue(nameAux, value);

        setForm(preState => ({
            ...preState,
            [nameAux]: valueAux
        }))
    }

    const getValue = (name, value) => {
        switch (name) {
            case "cardNumber":
                return value.replace(/[^0-9]/g, '');

            case "cvv":
                return value.replace(/[^0-9]/g, '');

            case "identificationNumber":
                return value.replace(/[^0-9]/g, '');

            case "expiryDate":
                let dateAux = value.replace(/[^0-9]/g, '')
                return dateAux.replace(/\//g, "").substring(0, 2) +
                    (dateAux.length > 2 ? '/' : '') +
                    dateAux.replace(/\//g, "").substring(2, 4);

            default:
                return value;
        }
    }

    return (
        <React.Fragment>
            {
                optionsAutocompletes.identificationTypes.length > 0 ?
                    <>
                        <Typography variant="h6" gutterBottom>
                            Payment method
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-identificationTypes"
                                    options={optionsAutocompletes.identificationTypes}
                                    onChange={(e, v) => setForm(p => ({ ...p, identificationType: v }))}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Identification type" variant="standard" />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="identificationNumber"
                                    id="identificationNumber"
                                    label="Identification number"
                                    fullWidth
                                    autoComplete="cc-name"
                                    variant="standard"
                                    value={form.identificationNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="nameOnCard"
                                    id="cardName"
                                    label="Name on card"
                                    fullWidth
                                    autoComplete="cc-name"
                                    variant="standard"
                                    value={form.nameOnCard}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    error={errorCard}
                                    helperText={errorCard}
                                    name="cardNumber"
                                    id="cardNumber"
                                    label="Card number"
                                    fullWidth
                                    autoComplete="cc-number"
                                    variant="standard"
                                    value={form.cardNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="expiryDate"
                                    id="expDate"
                                    label="Expiry date"
                                    fullWidth
                                    variant="standard"
                                    value={form.expiryDate}
                                    onChange={(handleChange)}
                                    inputProps={{ maxLength: 5 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    name="cvv"
                                    id="cvv"
                                    label="CVV"
                                    helperText="Last three digits on signature strip"
                                    fullWidth
                                    autoComplete="cc-csc"
                                    variant="standard"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 4 }}
                                />
                            </Grid>
                            {
                                optionsAutocompletes.issuers.length > 0 &&
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        name="issuer"
                                        id="combo-box-issuers"
                                        options={optionsAutocompletes.issuers}
                                        onChange={(e, v) => setForm(p => ({ ...p, issuer: v }))}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Issuer" variant="standard" />}
                                    />
                                </Grid>
                            }
                            {
                                optionsAutocompletes.installments.length > 0 &&
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        name="installment"
                                        id="combo-box-installments"
                                        options={optionsAutocompletes.installments}
                                        onChange={(e, v) => setForm(p => ({ ...p, installment: v }))}
                                        getOptionLabel={(option) => option.recommended_message}
                                        renderInput={(params) => <TextField {...params} label="Installments" variant="standard" />}
                                    />
                                </Grid>
                            }
                            {
                                errorPayment && <Grid item xs={12}><Typography color="red">{errorPayment}</Typography></Grid>
                            }
                        </Grid>
                    </>
                    :
                    <Loader />
            }

        </React.Fragment>
    );
}