import {React, useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


export default function Remove () {

    return( 
    <Modal show>
         <Modal.Header closeButton >
            <Modal.Title>Удалить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body><p class="lead">Уверены?</p></Modal.Body>
          <Modal.Footer>
                    <Button type="button" class="me-2 btn btn-secondary">Отменить</Button>
                    <Button type="button" class="btn btn-danger">Удалить</Button>
          </Modal.Footer>
          
    </Modal>
    )
}

               