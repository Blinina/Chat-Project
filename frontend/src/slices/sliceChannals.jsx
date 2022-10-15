import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';
/* eslint-disable no-param-reassign */

export const getData = createAsyncThunk('channels/getData', async (payload) => {
  const res = await axios.get(routes.usersPath(), { headers: payload });
  return res.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();
const sliceChannels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    renameChannel: (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id,
      changes: { name: payload.name },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getData.pending, (state) => {
        console.log(`загрузка: ${state.isLoading}`);
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getData.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);
export const getLoading = ((state) => state.channels.isLoading);

export const {
  addChannel, removeChannel, renameChannel,
} = sliceChannels.actions;
export default sliceChannels.reducer;
