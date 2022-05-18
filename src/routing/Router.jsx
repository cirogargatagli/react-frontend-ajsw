import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Index";
import { AuthContext } from "../context/AuthContext";
import Home from "../screens/Home";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";

export const Router = (props) => {
    const { user, token } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Switch>
                {
                    user && token ?
                        <Layout>
                            <Route path="/" component={Home} />
                        </Layout>
                        :
                        <>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/" component={Login} />
                        </>
                }
            </Switch>
        </BrowserRouter>
    );
};

export default Router;