import {
  React, useState, useRef, useEffect,
} from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useToastify } from '../../contexts/ToastifyContext';
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { errorToast } = useToastify();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else if (err.message === 'Network Error') {
          errorToast(t('errorNetwork'));
        }
      }
    },
  });
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h2 className="text-center mb-4">{t('loginPage.enter')}</h2>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          ref={inputRef}
          placeholder={t('loginPage.username')}
          required
          autoComplete="username"
          id="username"
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          placeholder={t('loginPage.password')}
          required
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
        {authFailed && (
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {t('loginPage.noValid')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button disabled={formik.isValid && !formik.dirty} type="submit" className="w-100 mb-3" variant="outline-primary">
        {t('loginPage.enter')}
      </Button>
    </Form>
  );
}
