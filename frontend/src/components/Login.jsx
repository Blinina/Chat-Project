import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import routes from '../routes/routes';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';


const validate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

export default function Login () {
  const navigate = useNavigate();

  return ( <Formik
  initialValues={{ username: '', password: '' }}
  validateOnBlur
  onSubmit={async (values) => {
    try {
      console.log(values)
      const res =  await axios.post(routes.loginPath(), values )
      console.log(res.data)
      // localStorage.setItem('userId', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      console.error(err);     

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
  }) => ( <>
         <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>
           <div className="form-floating mb-3">
           <input
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
          {/* <label htmlFor="username">Ваш ник</label> */}
          </div>
          {/* {errors.username && touched.username && errors.username} */}
          <div className="form-floating mb-4">
          <input
            className="form-control"
            placeholder="Пароль"
            required=""
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {/* <label class="form-label" for="password">Пароль</label> */}
          {/* {!isValid && !dirty && (<p>lol</p>)} */}
         </div>
          {/* {errors.password && touched.password && errors.password} */}
          <button disabled={isValid && !dirty} type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Submit
          </button>
        </form>
    </>
  )}
  </Formik>
);
}
