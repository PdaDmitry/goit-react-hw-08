import { Suspense } from 'react';
import { AppBar } from '../AppBar/AppBar';
import css from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
