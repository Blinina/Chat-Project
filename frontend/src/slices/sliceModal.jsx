import { createSlice } from '@reduxjs/toolkit';

const initialState = {show: false};

const sliceModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) =>{
        state.show = true;
    },
    closeModal: (state, action) =>{
      state.show = false;
  },
  },
});
// export const selectors = modalAdapter.getSelectors((state) => state.channels);
export const {showModal, closeModal} = sliceModal.actions
export default sliceModal.reducer