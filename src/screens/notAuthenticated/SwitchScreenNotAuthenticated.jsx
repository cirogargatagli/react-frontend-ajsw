import React from 'react'
import FormLogin from '../../components/ScreenNotAuthenticated/FormLogin';
import Config from "../../config.json"
import FormRegister from '../../components/ScreenNotAuthenticated/FormRegister';
import ScreenNotAuthenticated from './ScreenNotAuthenticated';

const SwitchScreenNotAuthenticated = ({
    screen = "login"
}) => {

    const switchProperties = () => {
        switch (screen) {
            case "login":
                return {
                    classBackground: "fondo-login",
                    title1: Config.strings.login.title1,
                    title2: Config.strings.login.title2,
                    form: <FormLogin />
                }
            case "register":
                return {
                    classBackground: "fondo-register",
                    title1: Config.strings.register.title1,
                    title2: Config.strings.register.title2,
                    form: <FormRegister />
                }
            default:
                break;
        }
    }

    return (
        <ScreenNotAuthenticated props={switchProperties()} />
    )
}

export default SwitchScreenNotAuthenticated;