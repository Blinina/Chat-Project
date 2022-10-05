import { React, useState } from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import useToastify from '../hooks/toastHooks';
import routes from '../routes/routes';
import useAuth from '../hooks/authHooks';

const validate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).required(),
});

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { errorToast } = useToastify();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const res = await axios.post(routes.loginPath(), values);
          localStorage.setItem('userId', JSON.stringify(res.data));
          setAuthFailed(false);
          auth.logIn();
          navigate('/');
        } catch (err) {
          console.error(err);
          if (err.response.status === 401) {
            setAuthFailed(true);
          }
          errorToast(t(errorNetwork));
        }
      }}
      validationSchema={validate}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">{t('loginPage.enter')}</h2>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              placeholder={t('loginPage.username')}
              required
              autoComplete="username"
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={authFailed}
            />
            <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
            {authFailed && (
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {t('loginPage.noValid')}
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button disabled={isValid && !dirty} type="submit" className="w-100 mb-3" variant="outline-primary">
            {t('loginPage.enter')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
