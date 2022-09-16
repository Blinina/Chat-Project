import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';


export default  function SignUpForm () {
return ( <>
    <h1 className="text-center mb-4">Регистрация</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
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
        // <form class="col-12 col-md-6 mt-3 mt-mb-0"><h1 class="text-center mb-4">Войти</h1><div class="form-floating mb-3"><input name="username" autocomplete="username" required="" placeholder="Ваш ник" id="username" class="form-control" value=""><label for="username">Ваш ник</label></div><div class="form-floating mb-4"><input name="password" autocomplete="current-password" required="" placeholder="Пароль" type="password" id="password" class="form-control" value=""><label class="form-label" for="password">Пароль</label></div><button type="submit" class="w-100 mb-3 btn btn-outline-primary">Войти</button></form>
        <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          </div>
          {errors.email && touched.email && errors.email}
          <div className="form-floating mb-4">
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
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
