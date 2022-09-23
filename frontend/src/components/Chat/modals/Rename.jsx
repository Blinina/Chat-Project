import {React, useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


export default function Rename () {

    return( 
    <Modal show>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <Form>
                    <Form.Group controlId="body">
                         <Form.Control 
                            required
                            defaultValue="lol"
                            data-testid="input-body"
                            name="body"
                            placeholder="Имя канала"
                            className="mb-3"
                            />
                        <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label> 
                      </Form.Group>
                        <div className="d-flex justify-content-end">
                     <Button  className="me-2"  variant="secondary">Отменить</Button>
                     <Button type="submit" variant="primary">Отправить</Button>
                     </div>
                  </Form>
          </Modal.Body>
    </Modal>

    )
}
