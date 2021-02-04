import React,{Fragment} from 'react'
import {Route,Switch} from 'react-router-dom';
import Header from './module/Header'
import Login from './module/Login'
import App from "./App";

export default (
    <Fragment>
        <Header/>
        <Switch>
            <Route exact path="/" component={Login}> </Route>
            <Route path="/data" component={App}></Route>
        </Switch>
    </Fragment>
);