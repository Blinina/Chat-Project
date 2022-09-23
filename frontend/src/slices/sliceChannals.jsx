import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';


const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const sliceChannels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
  },
});
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {addChannels, addChannel} = sliceChannels.actions
export default sliceChannels.reducer