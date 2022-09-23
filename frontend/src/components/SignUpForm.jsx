import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default  function SignUpForm () {
  const validate = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().min(6).required(),
  });
return ( <>
    <h1 className="text-center mb-4">Регистрация</h1>
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
      validationSchema={validate}
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
          <div className="form-floating mb-3">
          <input
               className="form-control"
               placeholder="Имя пользователя"
               required=""
               autoComplete="username"
               id="username"
               type="text"
               name="username"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.username}
          />
          </div>
          {errors.email && touched.email && errors.email}
          <div className="form-floating mb-3">
          <input
          className="form-control"
          placeholder="Пароль"
          required=""
          autoComplete="new-password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          />
         </div>
         <div className="form-floating mb-4">
          <input
            className="form-control"
            autoComplete="new-password" 
            placeholder="Пароли должны совпадать" 
            type="password"
            required="" 
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
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
