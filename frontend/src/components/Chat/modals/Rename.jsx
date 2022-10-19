import {
  React, useState, useEffect, useRef,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../slices/sliceModal';
import { useSocket } from '../../../contexts/SocketContext';
import { selectors } from '../../../slices/sliceChannals';
import { useToastify } from '../../../contexts/ToastifyContext';

export default function Rename() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const soc = useSocket();
  const { t } = useTranslation();
  const { successToast } = useToastify();
  const { item } = useSelector((store) => store.modal);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const currentChannel = allChannels.find((it) => it.id === item);
  const { id, name } = currentChannel;

  const [formValid, setFormValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validate = yup.object({
    body: yup.string()
      .required('modal.required')
      .min(3, 'modal.nameLenght')
      .max(20, 'modal.nameLenght')
      .notOneOf(namesChannels, 'modal.duplicate'),
  });

  const formik = useFormik({
    initialValues: { body: name },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);
        const { body } = values;
        soc.fnRenameChannel({ id, name: body });
        dispatch(closeModal());
        setValidationError(null);
        setFormValid(true);
        successToast(t('renameChannelToast'));
      } catch (err) {
        setValidationError(err.message);
        setFormValid(false);
      }
    },
  });

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Control
              // id="name"
              ref={inputRef}
              value={formik.values.body}
              data-testid="input-name"
              name="body"
              onChange={formik.handleChange}
              className={formValid ? 'mb-2' : 'form-control is-invalid mb-2'}
            />
            <Form.Label className="visually-hidden">{t('modal.name')}</Form.Label>
            <div className="invalid-fb">{t(validationError)}</div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary">{t('modal.cancelButton')}</Button>
            <Button onClick={formik.handleSubmit} type="submit" variant="primary">{t('modal.addButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
