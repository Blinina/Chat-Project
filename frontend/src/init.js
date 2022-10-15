import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import App from './components/App';
import store from './slices/store';
import resources from './locales/index';
import { addMessage } from './slices/sliceMessage';
import { addChannel, removeChannel, renameChannel } from './slices/sliceChannals.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};
console.log(process.env);

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  socket.on('newMessage', (messageWithId) => {
    store.dispatch(addMessage(messageWithId));
  });
  socket.on('newChannel', (channelWithId) => {
    store.dispatch(addChannel(channelWithId));
  });
  socket.on('removeChannel', (channelWithId) => {
    store.dispatch(removeChannel(channelWithId));
  });
  socket.on('renameChannel', (channelWithId) => {
    store.dispatch(renameChannel(channelWithId));
  });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App socket={socket} />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default init;
