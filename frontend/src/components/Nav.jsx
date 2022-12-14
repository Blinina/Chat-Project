import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <Navbar className="shadow-sm navbar navbar-light bg-white">
      <Container className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {auth.loggedIn ? <Button onClick={() => auth.logOut()} className="btn-primary">{t('logOut')}</Button> : null}
      </Container>
    </Navbar>
  );
}
