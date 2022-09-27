import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { store } from './slices/store';
import { Provider } from 'react-redux';
import resources from './locales/index'
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });
  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    environment: 'production',
  }

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