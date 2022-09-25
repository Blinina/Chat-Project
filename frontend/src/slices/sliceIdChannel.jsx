import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';


const currentChannelIdDAdapter = createEntityAdapter();

const initialState = {
  id: 1
};
const slicechannelId = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    changeChannelID: (state, action) => ({ ...state, id: action.payload }),
  },
});
export const selectors = currentChannelIdDAdapter.getSelectors((state) => state.currentChannelId);
export const {changeChannelID, initId} = slicechannelId.actions
export default slicechannelId.reducer