import {
  React, useState, useRef, useEffect,
} from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  // const [errorSignUp, setErrorSignUp] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: yup.object().shape({
      username: yup.string()
        .required((t('signUpPage.required')))
        .min(3, (t('signUpPage.usernameLenght')))
        .max(20, (t('signUpPage.usernameLenght'))),
      password: yup.string()
        .min(6, (t('signUpPage.minPasswordLenght')))
        .required(t('signUpPage.required')),
      confirmPassword: yup.string()
        // .required()
        .oneOf([yup.ref('password'), null], (t('signUpPage.passwordConErr'))),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        setAuthFailed(false);
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        if (err.response.status === 409) {
          console.log('Такой пользователь уже существует');
          setAuthFailed(true);
          inputRef.current.select();
        }
        throw err;
      }
    },
  });
  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4 sign-text">{t('signUpPage.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          placeholder={t('signUpPage.username')}
          required
          ref={inputRef}
          isInvalid={(formik.errors.username && formik.touched.username) || authFailed}
          autoComplete="username"
          id="username"
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('signUpPage.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.username}
        </Form.Control.Feedback>

      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          placeholder={t('signUpPage.password')}
          required
          autoComplete="new-password"
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
        />
        <Form.Label htmlFor="password">{t('signUpPage.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          autoComplete="new-password"
          placeholder={t('signUpPage.confirmPassword')}
          type="password"
          required
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={formik.errors.confirmPassword || authFailed}
        />
        <Form.Label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {authFailed ? t('signUpPage.authFailed') : formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" disabled={formik.isValid && !formik.dirty} className="w-100 mb-3">
        {t('signUpPage.signUp')}
      </Button>
    </form>
  );
}
