import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { store } from './slices/store';
import { Provider } from 'react-redux';
import resources from './locales/index'

const init = async (socket) => {
    const i18n = i18next.createInstance();

    // const defaultlanguage = 'ru';
    await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
    return (
        <I18nextProvider i18n={i18n}>
        <Provider store={store}>
               <App socket={socket}/>
         </Provider>
         </I18nextProvider>
    );
  };
  
  export default init;
