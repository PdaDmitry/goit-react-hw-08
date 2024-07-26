import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login } from '../../redux/auth/operations';
import { useId } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const initState = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const contactSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
  });

  return (
    <Formik initialValues={initState} onSubmit={handleSubmit} validationSchema={contactSchema}>
      <Form className={css.form} autoComplete="off">
        <div className={css.contInput}>
          <label className={css.inpName} htmlFor={emailId}>
            Email
          </label>
          <Field className={css.field} type="email" id={emailId} name="email" />
          <ErrorMessage className={css.errorText} name="email" component="span" />
        </div>

        <div className={css.contInput}>
          <label className={css.inpName} htmlFor={passwordId}>
            Password
          </label>
          <Field className={css.field} type="password" id={passwordId} name="password" />
          <ErrorMessage className={css.errorText} name="password" component="span" />
        </div>

        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
