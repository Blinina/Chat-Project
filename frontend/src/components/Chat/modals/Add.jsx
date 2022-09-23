import {React, useState, useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../slices/sliceModal';
import { addChannel } from '../../../slices/sliceChannals';

export default function Add () {
    const dispatch = useDispatch();
    const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    }, []);
  
    const generateOnSubmit = () => (values) => {
      console.log(values.body)
      dispatch(addChannel({id:`${values.body}ChannelId`, name: values.body, removable: true}))
      dispatch(closeModal())
    };
  const formik = useFormik({initialValues: { body: '' },
    onSubmit: generateOnSubmit()
      });
    
    return( 
    <Modal show onHide={()=>dispatch(closeModal())}>
             <Modal.Header closeButton>
                 <Modal.Title>Добавить канал</Modal.Title>
             </Modal.Header>
                <Modal.Body>
                  <form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="body">
                         <Form.Control 
                            onChange={formik.handleChange}
                            required
                            ref={inputRef}
                            value={formik.values.body}
                            data-testid="input-body"
                            name="body"
                            placeholder="Имя канала"
                            className="mb-3"
                            />
                        {/* <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>  */}
                      </Form.Group>
                        <div className="d-flex justify-content-end">
                     <Button onClick={()=>dispatch(closeModal())} className="me-2"  variant="secondary">Отменить</Button>
                     <Button onClick={formik.handleSubmit} type="submit" variant="primary">Отправить</Button>
                     </div>
                  </form>
          </Modal.Body>
    </Modal>
  

    )
}


