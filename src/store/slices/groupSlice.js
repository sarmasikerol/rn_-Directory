import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});
export const {setGroups} = groupsSlice.actions;
export default groupsSlice.reducer;
