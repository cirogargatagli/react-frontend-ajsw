export const initializeMP = () => {
    window.Mercadopago.setPublishableKey("TEST-3f6811a0-f77b-4c83-99d4-8008bda7332d");
}

export const getIdentificationTypesMP = () => {
    let identificationTypes = [];
    window.Mercadopago.getIdentificationTypes((status, response) => {
        if (status === 200) {
            identificationTypes = response
        }
    })
    return identificationTypes;
}