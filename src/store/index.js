import {configureStore} from '@reduxjs/toolkit';
import groupSlice from './slices/groupSlice';
import contactsSlice from './slices/contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    groups: groupSlice,
  },
});

export default store;
