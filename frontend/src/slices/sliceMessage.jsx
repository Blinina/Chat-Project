import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel, getData } from './sliceChannals';
/* eslint-disable no-param-reassign */

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const sliceMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const removeChannelId = action.payload;
        const allEntities = Object.values(state.entities);
        const restEntities = allEntities.filter((e) => e.channelId !== removeChannelId.id);
        messagesAdapter.setAll(state, restEntities);
      })
      .addCase(getData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getData.rejected, (state, action) => {
        console.log('rejected');
        state.isFetching = false;
        state.loadingError = action.error;
      });
  },
});
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const getMessage = (state) => selectors.selectAll(state);

export const { addMessage } = sliceMessages.actions;
export default sliceMessages.reducer;
