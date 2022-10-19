import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './sliceChannals';
import messagesReducer from './sliceMessage';
import modalReduser from './sliceModal';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReduser,
  },
});
