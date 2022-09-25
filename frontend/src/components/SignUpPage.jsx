import React from 'react'
import imageAvatarSg from '../assets/avatar_signup.jpg';
import SignUpForm from './SignUpForm';
import { Alert, Card, Col, Container, Form, Row, } from 'react-bootstrap';

export default function SignUpPage() {
    return (
        <Container className=" container-fluid h-100">
            <Row className=" justify-content-center align-content-center h-100">
                <Col className='col-12 col-md-8 col-xxl-6'>
                    <Card className="shadow-sm">
                        <Card.Body className="p-5 colomn-logi d-flex flex-column flex-md-row justify-content-around align-items-center">
                            <Col md={6} className="d-flex align-items-center justify-content-center kek">
                                <img src={imageAvatarSg} width="160px" alt="" />
                            </Col>
                            <Col className="kek">
                                <SignUpForm />
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}