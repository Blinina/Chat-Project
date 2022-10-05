import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import App from './components/App';
import store from './slices/store';
import resources from './locales/index';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};
const init = async (socket) => {
  const i18n = i18next.createInstance();
  console.log(process.env);
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

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
