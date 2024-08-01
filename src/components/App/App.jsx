import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { Layout } from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';

import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import { refreshUser } from '../../redux/auth/operations';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'));

import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <div className={css.cont}>
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
      <Toaster />
    </div>
  );
}
