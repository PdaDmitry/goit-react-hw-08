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
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { Layout } from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { ContactPage } from '../../pages/ContactPage/ContactPage';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import { refreshUser } from '../../redux/auth/operations';

export default function App() {
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="contacts" component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={<ContactPage />} />}
        />
      </Routes>
    </Layout>
  );

  // return (
  //   <div className={css.contPhonebook}>
  //     <h1>Phonebook</h1>
  //     {/* <RegistrationForm /> */}
  //     {/* <LoginForm /> */}

  //     <ContactForm />
  //     <SearchBox />
  //     {loading && <Loader />}
  //     {error && <ErrorMessage />}
  //     {!error && <ContactList />}
  //   </div>
  // );
}
