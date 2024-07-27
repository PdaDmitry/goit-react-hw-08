import DocumentTitle from '../../components/DocumentTitle';
import { GiRotaryPhone } from 'react-icons/gi';
import css from './HomePage.module.css';

export const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.contHome}>
        <h1 className={css.title}>Welcome to the phone book!</h1>
        <p>
          <GiRotaryPhone className={css.icon} size={150} />
        </p>
      </div>
    </>
  );
};
