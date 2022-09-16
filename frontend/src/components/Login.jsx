import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function Login () {
return ( <>
    <Formik
      initialValues={{ username: '', password: '' }}
      
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
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
          {errors.username && touched.username && errors.username}
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
         </div>
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
            Submit
          </button>
        </form>
      )}
    </Formik>
    </>
)
}
export default Login