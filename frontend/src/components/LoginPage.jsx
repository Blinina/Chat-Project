import React from 'react';
import {
  Card, Col, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imageAvatar from '../assets/avatar.jpg';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row colomn-login">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imageAvatar} className="rounded-circle" width="200px" alt="" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('loginPage.notAccount')}
                  {' '}
                </span>
                <a href="/signup">{t('loginPage.signUp')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
