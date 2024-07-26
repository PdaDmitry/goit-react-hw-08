import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { LoginForm } from '../LoginForm/LoginForm';

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contPhonebook}>
      <h1>Phonebook</h1>
      {/* <RegistrationForm /> */}
      {/* <LoginForm /> */}

      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!error && <ContactList />}
    </div>
  );
}
