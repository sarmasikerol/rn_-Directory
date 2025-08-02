import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  updateList: false,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    resetStore: (state, action) => {
      state.contacts = [];
      state.updateList = false;
    },
    setUpdateList: (state, action) => {
      state.updateList = true;
    },
  },
});
export const {setContacts, resetStore, setUpdateList} = contactSlice.actions;
export default contactSlice.reducer;
