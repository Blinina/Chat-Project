import {
  React, useState, useEffect, useRef,
} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../slices/sliceModal';
import { useSocket } from '../../../contexts/SocketContext';
import { selectors } from '../../../slices/sliceChannals';
import { useToastify } from '../../../contexts/ToastifyContext';
import { useAuth } from '../../../contexts/AuthContext';

export default function Add() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const auth = useAuth();
  const soc = useSocket();
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
    name: yup.string()
      .required('modal.required')
      .min(3, 'modal.nameLenght')
      .max(20, 'modal.nameLenght')
      .notOneOf(namesChannels, 'modal.duplicate'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);
        setFormValid(true);
        setValidationError(null);
        const newChannel = {
          id: _.uniqueId(), name: values.name, author: auth.getUsername(), removable: true,
        };
        soc.addNewChannel(newChannel);
        dispatch(closeModal());
        successToast(t('addChannelToast'));
      } catch (err) {
        setValidationError(err.message);
        setFormValid(false);
        console.log(err.message);
      }
    },
  });

  return (
    <Modal centered show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              onChange={formik.handleChange}
              ref={inputRef}
              value={formik.values.name}
              data-testid="input-name"
              name="name"
              className={formValid ? 'mb-2' : 'form-control is-invalid mb-2'}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.name')}</Form.Label>
            <div className="invalid-fb">{t(validationError)}</div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary">
              {t('modal.cancelButton')}
            </Button>
            <Button onClick={formik.handleSubmit} type="submit" variant="primary">
              {t('modal.addButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
