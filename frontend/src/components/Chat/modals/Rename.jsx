import {
  React, useState, useEffect, useRef, useContext,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { closeModalRename } from '../../../slices/sliceModal';
import SocketContext from '../../../contexts/SocketContext';
import { selectors } from '../../../slices/sliceChannals';
import useToastify from '../../../hooks/toastHooks';

export default function Rename({ item }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { successToast } = useToastify();
  const { id, name } = item;

  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const [formValid, setFormValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validate = yup.object({
    name: yup.string()
      .required('modal.required')
      .min(3, 'modal.nameLenght')
      .max(20, 'modal.nameLenght')
      .notOneOf(namesChannels, 'modal.duplicate'),
  });

  const formik = useFormik({
    initialValues: { name },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);
        socket.emit('renameChannel', { id, name });
        dispatch(closeModalRename());
        setValidationError(null);
        setFormValid(true);
        console.log(allChannels);
        successToast(t('renameChannelToast'));
      } catch (err) {
        setValidationError(err.message);
        setFormValid(false);
      }
    },
  });

  return (
    <Modal show centered onHide={() => dispatch(closeModalRename())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              id="name"
              ref={inputRef}
              value={formik.values.name}
              data-testid="input-name"
              name="name"
              onChange={formik.handleChange}
              className={formValid ? 'mb-3' : 'form-control is-invalid mb-3'}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.name')}</Form.Label>
            <div className="invalid-fb">{t(validationError)}</div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModalRename())} className="me-2" variant="secondary">{t('modal.cancelButton')}</Button>
            <Button onClick={formik.handleSubmit} type="submit" variant="primary">{t('modal.addButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
