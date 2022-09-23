import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './sliceChannals'
import messagesReducer from './sliceMessage'
import modalReduser from './sliceModal'
export const store = configureStore({
    reducer: {
     channels: channelsReducer,
     messages: messagesReducer,
     modal: modalReduser,
    }
  })