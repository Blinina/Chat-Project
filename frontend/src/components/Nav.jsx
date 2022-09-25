import React from "react";
import {Navbar,Button } from 'react-bootstrap';
import useAuth from "../hooks/authHooks";
import { useTranslation } from 'react-i18next';

export default function Navigation () {
    const { t } = useTranslation();
    const auth = useAuth();
return(
    <Navbar className="shadow-sm navbar navbar-light bg-white">
        <div className="container">
            <a className="navbar-brand" href="login">Hexlet Chat</a>
            {auth.loggedIn ? <Button onClick={()=>auth.logOut()} className="btn btn-primary">{t('logOut')}</Button> : null}
        </div>
    </Navbar >
)
}