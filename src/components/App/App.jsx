import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    </div>
  );
}
