import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={() => dispatch(logout)}>
        LogOut
      </button>
    </div>
  );
};
