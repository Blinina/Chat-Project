import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';


const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const sliceChannels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    renameChannel:  (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id,
      changes: { name: payload.name },
    }), 
}
});
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {addChannels, addChannel, removeChannel, renameChannel} = sliceChannels.actions
export default sliceChannels.reducer