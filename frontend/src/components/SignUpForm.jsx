import { React, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes/routes';
import useAuth from '../hooks/authHooks';

export default function SignUpForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [errorSignUp, setErrorSignUp] = useState(false);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup.string()
      .required((t('signUpPage.required')))
      .min(3, (t('signUpPage.usernameLenght')))
      .max(20, (t('signUpPage.usernameLenght'))),
    password: yup.string()
      .min(6, (t('signUpPage.minPasswordLenght')))
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      // .required()
      .oneOf([yup.ref('password'), null], (t('signUpPage.passwordConErr'))),

  });

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          const res = await axios.post(routes.signupPath(), values);
          console.log(res);
          localStorage.setItem('userId', JSON.stringify(res.data));
          auth.logIn();
          navigate('/');
        } catch (err) {
          if (err.response.status === 409) {
            console.log('Такой пользователь уже существует');
            setErrorSignUp(true);
          }
          throw err;
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty,
      /* and other goodies */
      }) => (
        <form className="w-50" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 sign-text">{t('signUpPage.title')}</h2>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              placeholder={t('signUpPage.username')}
              required
              isInvalid={!!errors.username}
              autoComplete="username"
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <Form.Label htmlFor="username">{t('signUpPage.username')}</Form.Label>
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {errors.username}
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={!!errors.password}
            />
            <Form.Label htmlFor="password">{t('signUpPage.password')}</Form.Label>
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {errors.password}
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              isInvalid={errors.confirmPassword}
            />
            <Form.Label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</Form.Label>
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {errors.confirmPassword}
            </Form.Control.Feedback>
            {errorSignUp && (
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {t('loginPage.errorSignUp')}
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button type="submit" disabled={isValid && !dirty} className="w-100 mb-3">
            {t('signUpPage.signUp')}
          </Button>
        </form>
      )}
    </Formik>

  );
}
