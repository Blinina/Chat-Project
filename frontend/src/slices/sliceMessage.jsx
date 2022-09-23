import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';


const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const sliceMessages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const {addMessages, addMessage} = sliceMessages.actions
export default sliceMessages.reducer