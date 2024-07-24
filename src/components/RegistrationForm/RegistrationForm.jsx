import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';

export const RegistrationForm = () => {
  const userId = useId();
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const initState = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    password: Yup.string().min(3, 'Too Short!').required('Required'),
  });

  return (
    <Formik initialValues={initState} onSubmit={handleSubmit} validationSchema={contactSchema}>
      <Form className={css.form} autoComplete="off">
        <div className={css.contInput}>
          <label className={css.inpName} htmlFor={userId}>
            Username
          </label>
          <Field className={css.field} type="text" id={userId} name="name" />
          <ErrorMessage className={css.errorText} name="name" component="span" />
        </div>

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
          Register
        </button>
      </Form>
    </Formik>
  );
};
