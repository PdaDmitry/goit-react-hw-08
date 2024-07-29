import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import Loader from '../../components/Loader/Loader';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import DocumentTitle from '../../components/DocumentTitle';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { ErrorMessage } from 'formik';
import css from './ContactPage.module.css';

export const ContactPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contContactPage}>
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && <ContactList />}
    </div>
  );
};
