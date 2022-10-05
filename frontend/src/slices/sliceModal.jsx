import { createSlice } from '@reduxjs/toolkit';

const initialState = { showAdd: false, showRemove: false, showRename: false };

const sliceModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalAdd: ((state) => {
      /* eslint-disable no-param-reassign */
      state.showAdd = true;
      /* eslint-disable no-param-reassign */
    }),
    closeModalAdd: ((state) => {
      state.showAdd = false; /* eslint-disable no-param-reassign */
    }),
    showModalRemove: ((state) => {
      state.showRemove = true;
    }),
    closeModalRemove: ((state) => {
      state.showRemove = false;
    }),
    showModalRename: ((state) => {
      state.showRename = true;
    }),
    closeModalRename: ((state) => {
      state.showRename = false;
    }),
  },
});
// export const selectors = modalAdapter.getSelectors((state) => state.channels);
export const {
  showModalAdd, closeModalAdd, showModalRemove,
  closeModalRemove, showModalRename, closeModalRename,
} = sliceModal.actions;
export default sliceModal.reducer;
