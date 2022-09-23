import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';


const IdAdapter = createEntityAdapter();

const initialState = IdAdapter.getInitialState();

const sliceId = createSlice({
  name: 'channelsID',
  initialState,
  reducers: {
    
  },
});
export const selectors = IdAdapter.getSelectors((state) => state.channels);
export const {addChannels} = sliceId.actions
export default sliceId.reducer