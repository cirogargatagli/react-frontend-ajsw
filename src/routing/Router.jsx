import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Index";
import { AuthContext } from "../context/AuthContext";
import Activities from "../screens/Activities";
import Courses from "../screens/Courses";
import Home from "../screens/Home";
import Login from "../screens/login/Login";
import Profile from "../screens/Profile";
import Register from "../screens/register/Register";
import Reserves from "../screens/Reserves";

export const Router = (props) => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Switch>
                {
                    isAuthenticated() ?
                        <Layout>
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/courses" component={Courses} />
                            <Route exact path="/activities" component={Activities} />
                            <Route exact path="/reserves" component={Reserves} />
                            <Redirect exact path="*" to={{ pathname: "/home" }} />
                        </Layout>
                        :
                        <>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Redirect path="*" to="/login" />
                        </>
                }
            </Switch>
        </BrowserRouter>
    );
};

export default Router;