import { FaUser } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import css from './Contact.module.css';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import Modal from 'react-modal';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';

Modal.setAppElement('#root');

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  //function to open the "Update Contact" modal window
  const openUpdateModal = contact => {
    setSelectedContact(contact);
    setIsUpdate(true);
    setModalIsOpen(true);
  };

  //function to open the "Delete Contact" modal window
  const openDeleteModal = () => {
    setIsUpdate(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedContact(null);
    setIsUpdate(false);
  };

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success(`Contact '${name}' deleted successfully!`);
        closeModal();
      })
      .catch(() => {
        toast.error('Something went wrong, try again...');
        closeModal();
      });
  };

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
      <div className={css.contactButtons}>
        <button className={css.btn} onClick={() => openUpdateModal({ id, name, number })}>
          Update
        </button>
        <button className={css.btn} onClick={openDeleteModal}>
          {/* When you click on the "Delete" button, a modal window opens //onClick={openDeleteModal} */}
          Delete
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '15px',
          },
        }}
      >
        {isUpdate ? (
          <UpdateContactForm contact={selectedContact} closeModal={closeModal} />
        ) : (
          <>
            <h2>Are you sure you want to delete contact `{name}`?</h2>
            <div className={css.modalButtons}>
              <button onClick={handleDelete} className={css.btnModal}>
                {/* When you click on the "Delete" button, the "handleDelete" function is launched */}
                Delete
              </button>
              <button onClick={closeModal} className={css.btnModal}>
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
