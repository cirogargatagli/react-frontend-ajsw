import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import Review from './ReviewOrder';
import CourseDetail from './CourseDetail';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/ApiCourses';

const steps = ['Course details', 'Payment details', 'Review your order'];

const theme = createTheme();

export default function Checkout() {
    let { id } = useParams();

    const [course, setCourse] = React.useState(null);
    const [activeStep, setActiveStep] = React.useState(0);

    const [formPayment, setFormPayment] = React.useState({
        identificationType: "",
        identificationNumber: "",
        nameOnCard: "",
        cardNumber: "",
        cvv: "",
        expiryDate: "",
        issuer: "",
        installment: "",
        paymentMethodId: "",
    });

    React.useEffect(() => {
        getCourse(id)
            .then(res => {
                setCourse(res.data);
            })
            .catch(error => console.log(error));
    }, [])

    React.useEffect(() => {

        if (activeStep === steps.length) {
            let expirity = formPayment.expiryDate.split("/");

            let formCreateTokenCard = {
                cardNumber: formPayment.cardNumber,
                cardholderName: formPayment.nameOnCard,
                docType: formPayment.identificationType.id,
                docNumber: formPayment.identificationNumber,
                cardExpirationMonth: parseInt(expirity[0]),
                cardExpirationYear: parseInt("20" + expirity[1]),
                securityCode: parseInt(formPayment.cvv)
            }
            window.Mercadopago.createToken(formCreateTokenCard, (status, response) => {
                console.log(response)
            });
        }
    }, [activeStep])


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CourseDetail course={course} />;
            case 1:
                return <PaymentForm course={course} form={formPayment} setForm={setFormPayment} />;
            case 2:
                return <Review course={course} payment={formPayment} />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}