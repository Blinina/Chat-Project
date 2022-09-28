import { React, useState, useEffect, useRef, useContext } from 'react'
import { Formik, ErrorMessage, } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios'
import routes from '../routes/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/authHooks';
import { useTranslation } from 'react-i18next';


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
      .oneOf([yup.ref('password'), null], (t('signUpPage.passwordConErr')))

  });

  return (<Formik
    initialValues={{ username: '', password: '', confirmPassword: '' }}
    validationSchema={schema}
    onSubmit={async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values)
        console.log(res)
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn()
        navigate('/');
      } catch (err) {
        if (err.response.status === 409) {
          console.log('Такой пользователь уже существует')
          setErrorSignUp(true)
        }
        throw err
      }
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
      isValid,
      dirty
      /* and other goodies */
    }) => (
      <form className="w-50" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4 sign-text">{t('signUpPage.title')}</h1>
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
          {errorSignUp && <Form.Control.Feedback type="invalid" className="invalid-tooltip">
            {t('loginPage.errorSignUp')}
          </Form.Control.Feedback>}
        </Form.Group>
        <Button type="submit" disabled={isValid && !dirty} className="w-100 mb-3">
          {t('signUpPage.signUp')}
        </Button>
      </form>
    )}
  </Formik>

  )
}


// const navigate = useNavigate();
//   const auth = useAuth();

//   const validate = yup.object().shape({
//     username: yup.string().min(3).max(6).required('Обязательное поле'),
//     password: yup.string().min(6).required('Обязательное поле'),
//     confirmPassword: yup.string().min(6).required('Обязательное поле'),
//   });
// return ( <Formik
//       initialValues={{ username: '', password: '', confirmPassword: '' }}
//       validationSchema={validate}
//       onSubmit={async (values) => {    
//         try {
//           const res =  await axios.post(routes.signupPath(), values)
//           console.log(res)
//           localStorage.setItem('userId', JSON.stringify(res.data));
//           auth.logIn()
//           navigate('/');
//         } catch (err) {
//           console.error(err);
//           console.error(err.response.status);
//           if(err.response.status===409){
//             console.log('Такой пользователь уже существует')
//            }
          
//         }
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         isValid, 
//         dirty
//         /* and other goodies */
//       }) => (
//         <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
//               <h1 className="text-center mb-4">Регистрация</h1>
//           <Form.Group className="mb-3">
//           <Form.Control
//                placeholder="Имя пользователя"
//                required
//                isInvalid={!!errors.username}
//                autoComplete="username"
//                id="username"
//                type="text"
//                name="username"
//                onChange={handleChange}
//                onBlur={handleBlur}
//                value={values.username}
//           />
//           <Form.Control.Feedback type="invalid" tooltip>
//                 {errors.username}
//               </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group className="mb-3">
//           <Form.Control
//           placeholder="Пароль"
//           required
//           autoComplete="new-password"
//           id="password"
//           type="password"
//           name="password"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.password}
//           />
//          <ErrorMessage name="password" />
//          </Form.Group>
//          <Form.Group className="mb-4">
//           <Form.Control
//             autoComplete="new-password" 
//             placeholder="Пароли должны совпадать" 
//             type="password"
//             required
//             id="confirmPassword"
//             name="confirmPassword"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.confirmPassword}
//           />
//           <ErrorMessage name="confirmPassword" />

//          </Form.Group>
//           {/* {errors.password && touched.password && errors.password} */}
//           <Button type="submit" disabled={isValid && !dirty} className="w-100 mb-3">
//             Submit
//           </Button>
//         </form>
//       )}
//     </Formik>
// )