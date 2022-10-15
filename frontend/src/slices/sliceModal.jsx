import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const initialState = { type: null, item: null };

const sliceModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: ((state, action) => {
      const { type, itemId } = action.payload;
      state.type = type;
      state.item = itemId;
    }),
    closeModal: ((state) => {
      state.type = null;
      state.item = null;
    }),
  },
});
// export const selectors = modalAdapter.getSelectors((state) => state.channels);
export const {
  showModal, closeModal,
} = sliceModal.actions;
export default sliceModal.reducer;

// const initialState = { showAdd: false, showRemove: false, showRename: false };

// const sliceModal = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     showModalAdd: ((state) => {
//       state.showAdd = true;
//     }),
//     closeModalAdd: ((state) => {
//       state.showAdd = false;
//     }),
//     showModalRemove: ((state) => {
//       state.showRemove = true;
//     }),
//     closeModalRemove: ((state) => {
//       state.showRemove = false;
//     }),
//     showModalRename: ((state) => {
//       state.showRename = true;
//     }),
//     closeModalRename: ((state) => {
//       state.showRename = false;
//     }),
//   },
// });
// // export const selectors = modalAdapter.getSelectors((state) => state.channels);
// export const {
//   showModalAdd, closeModalAdd, showModalRemove,
//   closeModalRemove, showModalRename, closeModalRename,
// } = sliceModal.actions;
// export default sliceModal.reducer;
