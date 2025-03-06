/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ThemeProvider from './src/config/theme/ThemeProvider';
import i18n from './src/utils/i18n';
import {RootState, store} from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux';

const persistor = persistStore(store);

const Theme = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Theme);
