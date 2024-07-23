import { FaUser } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import css from './Contact.module.css';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();

  return (
    <div className={css.contContact}>
      <div>
        <p>
          <FaUser className={css.iconUser} size={14} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.iconPhone} size={14} />
          {number}
        </p>
      </div>
      {/* if you need to pass several arguments to deleteContact(id), then we pass deleteContact({id: item.id, value: 5}) as an object */}
      <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </div>
  );
}
