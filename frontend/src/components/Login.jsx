import {React, useState, useEffect} from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import routes from '../routes/routes';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/authHooks';


const validate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).required(),
});

export default function Login () {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  return ( <Formik
  initialValues={{ username: '', password: '' }}
  validateOnBlur
  onSubmit={async (values) => {
    setAuthFailed(false);

    try {
      const res =  await axios.post(routes.loginPath(), values )
      localStorage.setItem('userId', JSON.stringify(res.data));
    
      auth.logIn()
    
      navigate('/');
    } catch (err) {
      console.error(err); 

      setAuthFailed(true);
       if(err.response.status===401){
        console.log('Неверные имя пользователя или пароль')
       }
    }
  }}
  validationSchema={validate}
>
  {({
    values,
    errors,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    dirty,
  }) => ( <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
           <Form.Group className="form-floating mb-3">
           <Form.Control
            className="form-control"
            placeholder="Ваш ник"
            required=""
            autoComplete="username"
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {/* <Form.Label htmlFor="username">Ваш ник</Form.Label> */}
          </Form.Group>
          {/* {errors.username && touched.username && errors.username} */}
          <Form.Group className="form-floating mb-4">
          <Form.Control
            className="form-control is-invalid"
            placeholder="Пароль"
            required=""
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {/* <Form.Label class="form-label" htmlFor="password">Пароль</Form.Label> */}
          {/* {!isValid && !dirty && (<p>lol</p>)} */}
         </Form.Group>
          {/* {errors.password && touched.password && errors.password} */}
          <Button disabled={isValid && !dirty} type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Submit
          </Button>
        </Form>
  )}
  </Formik>
);
}

