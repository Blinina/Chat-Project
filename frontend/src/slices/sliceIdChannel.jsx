import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
};
const slicechannelId = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    changeChannelID: (state, action) => ({ ...state, id: action.payload }),
  },
});

export const getActiveChannel = (state) => state.currentChannelId.id;

export const { changeChannelID, initId } = slicechannelId.actions;
export default slicechannelId.reducer;
