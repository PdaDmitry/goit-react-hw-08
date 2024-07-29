import { useSelector } from 'react-redux';
import { Navigation } from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { AuthNav } from '../AuthNav/AuthNav';
import { UserMenu } from '../UserMenu/UserMenu';
import css from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(isLoggedIn);

  return (
    <div className={css.contNav}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};
