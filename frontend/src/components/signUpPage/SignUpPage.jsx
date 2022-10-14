import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imageAvatarSg from '../../assets/avatar_signup.jpg';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  const { t } = useTranslation();
  return (
    <div className="sign-form container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="sign-form d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={imageAvatarSg} width="200px" height="200px" className="rounded-circle" alt="" />
              </div>
              <SignUpForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('signUpPage.haveAccount')}
                  {' '}
                </span>
                <a href="/login">{t('signUpPage.login')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
