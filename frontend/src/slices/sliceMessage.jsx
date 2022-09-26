import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { removeChannel } from './sliceChannals';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const sliceMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const removeChannelId = action.payload;
      const allEntities = Object.values(state.entities);
      const restEntities = allEntities.filter((e) => e.channelId !== removeChannelId.id);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = sliceMessages.actions
export default sliceMessages.reducer