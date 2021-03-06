import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Index";
import { AuthContext } from "../context/AuthContext";
import Activities from "../screens/Activities";
import Courses from "../screens/courses/Courses";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Reserves from "../screens/Reserves";
import SwitchScreenNotAuthenticated from "../screens/notAuthenticated/SwitchScreenNotAuthenticated";
import Checkout from "../screens/course/checkout/Checkout";
import CRUDCourses from "../screens/administration/CRUDCourses";
import CRUDUsers from "../screens/administration/CRUDUsers";
import AddCourse from "../screens/administration/AddCourse";
import MyCourses from "../screens/instructor/MyCourses";
import CRUDActivities from "../screens/administration/CRUDActivities";

export const Router = (props) => {
    const { isAuthenticated, isClient, isAdmin, isInstructor } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Switch>
                {
                    isAuthenticated() ?
                        <Layout>
                            <Route exact path="/home" component={Home} />
                            <Route path="/profile" component={Profile} />
                            {
                                isAdmin() && (
                                    <>
                                        <Route path="/crud-courses" component={CRUDCourses} />
                                        <Route path="/add-course" component={AddCourse} />
                                        <Route path="/users" component={CRUDUsers} />
                                        <Route path="/crud-activities" component={CRUDActivities} />
                                    </>
                                )
                            }
                            {
                                isClient() && (
                                    <>
                                        <Route exact path="/courses" component={Courses} />
                                        <Route path="/courses/:id" component={Checkout} />
                                        <Route path="/activities" component={Activities} />
                                        <Route path="/reserves" component={Reserves} />
                                    </>
                                )
                            }
                            {
                                isInstructor() && (
                                    <Route path="/my-courses" component={MyCourses} />
                                )
                            }






                            <Redirect path="*" to={{ pathname: "/home" }} />
                        </Layout>
                        :
                        <>
                            <Route path="*" render={() => <Redirect to="/login" />} />
                            <Route exact path="/login" render={() => <SwitchScreenNotAuthenticated />} />
                            <Route path="/register" render={() => <SwitchScreenNotAuthenticated screen="register" />} />
                        </>
                }
            </Switch>
        </BrowserRouter>
    );
};

export default Router;