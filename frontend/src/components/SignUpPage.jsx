import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import imageAvatarSg from '../assets/avatar_signup.jpg';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
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
                    </Card>
                </Col>
            </Row>
        </div>
    )
}