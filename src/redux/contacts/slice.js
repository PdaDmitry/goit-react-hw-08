import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from '../../redux/contacts/operations';
import { logout } from '../auth/operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = state => {
  state.loading = false;
  state.error = true;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      // Add contact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      // Delete contact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected)
      //Update contact
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        //Find the element index by id and change the value
        // const index = state.items.findIndex(item => item.id === action.payload.id);
        // if (index) {
        //   state.items[index] = action.payload;
        // }
        state.items[state.items.findIndex(item => item.id === action.payload.id)] = action.payload;
      })
      .addCase(updateContact.rejected, handleRejected)
      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
