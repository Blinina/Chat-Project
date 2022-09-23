import React from 'react'
import imageAvatar from '../assets/avatar.jpg';
import Login from './Login';
import {Alert, Card, Col, Container, Form, Row,} from 'react-bootstrap';
export default function LoginPage () {
    return (
        <Container className="h-100">
        <Row className="row justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
        <Card className="shadow-sm">
            <Card.Body className="p-5 colomn-login">
            <Col md={6} className="d-flex align-items-center justify-content-center kek">
            <img src={imageAvatar} width="160px" alt="" />
            </Col>
            <Col className="kek">
                  <Card.Title className="text-center mb-5">
                    <h2>Войти</h2>
                  </Card.Title>
                 <Login />
            </Col>
            </Card.Body>
    {/* //footer  */}
    <Card.Footer className="p-4">
        <div className="text-center">
            <span>Нет аккаунта?</span> 
            <a href="/signup">Регистрация</a>
        </div>
    </Card.Footer>
            </Card>
            </Col>
            </Row>
            </Container>
    )
}