import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './sliceChannals';
import messagesReducer from './sliceMessage';
import modalReduser from './sliceModal';
import currentChannelIdReduser from './sliceIdChannel';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReduser,
    currentChannelId: currentChannelIdReduser,
  },
});
