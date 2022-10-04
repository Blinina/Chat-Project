import { createSlice } from '@reduxjs/toolkit';

const initialState = { showAdd: false, showRemove: false, showRename: false, };

const sliceModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalAdd: (state, action) => {
      state.showAdd = true;
    },
    closeModalAdd: (state, action) => {
      state.showAdd = false;
    },
    showModalRemove: (state, action) => {
      state.showRemove = true;
    },
    closeModalRemove: (state, action) => {
      state.showRemove = false;
    },
    showModalRename: (state, action) => {
      state.showRename = true;
    },
    closeModalRename: (state, action) => {
      state.showRename = false;
    },
  },
});
// export const selectors = modalAdapter.getSelectors((state) => state.channels);
export const { showModalAdd, closeModalAdd, showModalRemove,
  closeModalRemove, showModalRename, closeModalRename } = sliceModal.actions
export default sliceModal.reducer