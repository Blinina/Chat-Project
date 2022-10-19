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

export const {
  showModal, closeModal,
} = sliceModal.actions;
export default sliceModal.reducer;
