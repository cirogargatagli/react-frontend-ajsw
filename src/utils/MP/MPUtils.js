export const initializeMP = () => {
    window.Mercadopago.setPublishableKey("TEST-37a453f3-0719-4f93-afa0-9888e6053dbd");
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