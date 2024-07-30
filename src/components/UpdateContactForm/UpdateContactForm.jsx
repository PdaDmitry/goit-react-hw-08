import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';

import css from './UpdateContactForm.module.css';

export default function UpdateContactForm({ contact, closeModal }) {
  const userId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const initState = {
    name: contact.name,
    number: contact.number,
  };

  const handleUpdateContact = (values, actions) => {
    dispatch(updateContact({ id: contact.id, ...values }))
      .unwrap()
      .then(() => {
        toast.success(`Contact ${values.name} successfully updated!`);
        actions.resetForm();
        closeModal();
      })
      .catch(() => {
        toast.error('Something went wrong, try again...');
        actions.resetForm();
        closeModal();
      });
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(/^[\d-]+$/, 'Number can only contain digits and dashes'),
  });

  return (
    <Formik
      initialValues={initState}
      onSubmit={handleUpdateContact}
      validationSchema={contactSchema}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.contInput}>
          <label className={css.inpName} htmlFor={userId}>
            Username
          </label>
          <Field className={css.field} type="text" id={userId} name="name" />
          <ErrorMessage className={css.errorText} name="name" component="span" />
        </div>

        <div className={css.contInput}>
          <label className={css.inpName} htmlFor={numberId}>
            Number
          </label>
          <Field className={css.field} type="text" id={numberId} name="number" />
          <ErrorMessage className={css.errorText} name="number" component="span" />
        </div>

        <button className={css.btn} type="submit">
          Update contact
        </button>

        <button className={css.btn} type="button" onClick={closeModal}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}
