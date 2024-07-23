import { useId } from 'react';
import css from './SearchBox.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import { selectFilter } from '../../redux/selectors';

export default function SearchBox() {
  const findId = useId();
  const dispatch = useDispatch();
  const filtersValue = useSelector(selectFilter);

  return (
    <div className={css.contFilter}>
      <label htmlFor={findId}>Find contacts by name</label>
      <input
        className={css.inpFilter}
        type="text"
        id={findId}
        value={filtersValue}
        onChange={e => dispatch(changeFilter(e.target.value))}
        placeholder="Search for contact"
      />
    </div>
  );
}
