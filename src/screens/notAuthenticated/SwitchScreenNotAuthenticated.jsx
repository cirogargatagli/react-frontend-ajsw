import React from 'react'
import FormLogin from '../../components/ScreenNotAuthenticated/FormLogin';
import Config from "../../config.json"
import FormRegister from '../../components/ScreenNotAuthenticated/FormRegister';
import ScreenNotAuthenticated from './ScreenNotAuthenticated';

const SwitchScreenNotAuthenticated = ({
    screen = "login"
}) => {
    let screens = {
        login: {
            classBackground: "fondo-login",
            title1: Config.strings.login.title1,
            title2: Config.strings.login.title2,
            form: <FormLogin />
        },
        register: {
            classBackground: "fondo-register",
            title1: Config.strings.register.title1,
            title2: Config.strings.register.title2,
            form: <FormRegister />
        }
    }

    return (
        <ScreenNotAuthenticated props={screens[screen]} />
    )
}

export default SwitchScreenNotAuthenticated;