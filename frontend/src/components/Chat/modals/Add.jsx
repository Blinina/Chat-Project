import { React, useState, useEffect, useRef, useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { closeModalAdd } from '../../../slices/sliceModal';
import SocketContext from '../../../contexts/SocketContext';
import useAuth from '../../../hooks/authHooks';
import _ from 'lodash';
import { selectors } from '../../../slices/sliceChannals';
import { useTranslation } from 'react-i18next';
import useToastify from '../../../hooks/toastHooks';
import { changeChannelID } from '../../../slices/sliceIdChannel';
import { RollbarContext } from '@rollbar/react';

export default function Add() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const auth = useAuth();
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const [formValid, setFormValid] = useState(true);
  const [validationError, setValidationError] = useState('');
  const { successToast } = useToastify();

  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = yup.object({
    body: yup.string()
      .required('modal.required')
      .min(3, 'modal.nameLenght')
      .max(20, 'modal.nameLenght')
      .notOneOf(namesChannels, 'modal.duplicate')
  });

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);
        setFormValid(true);
        setValidationError(null);
        const newChannel = { id: _.uniqueId(), name: values.body, author: auth.getUsername(), removable: true };
        socket.emit('newChannel', newChannel, (res) => {
         if(res.status==='ok'){
         dispatch(changeChannelID((res.data.id)));
         }
        })
       
        dispatch(closeModalAdd())
        successToast(t('addChannelToast'));
      } catch (err) {
        setValidationError(err.message);
        setFormValid(false);
        console.log(err.message)
      }
    },
  });

  return (<Modal centered show onHide={() => dispatch(closeModalAdd())}>
    <Modal.Header closeButton>
      <Modal.Title>{t('modal.addChannel')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={formik.handleSubmit}>
        <Form.Group className="form-floating">
          <Form.Control
            onChange={formik.handleChange}
            ref={inputRef}
            value={formik.values.body}
            data-testid="input-body"
            name="body"
            className={formValid ? 'mb-2' : 'form-control is-invalid mb-2'}
          />
          {/* <Form.Label className="visually-hidden" htmlFor="body">{t('modal.name')}</Form.Label> */}
          <div className="invalid-fb">{t(validationError)}</div>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModalAdd())} className="me-2" variant="secondary">
            {t('modal.cancelButton')}
          </Button>
          <Button onClick={formik.handleSubmit} type="submit" variant="primary">
            {t('modal.addButton')}
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
  )
}


