import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/icon.png'),
  require('./assets/icon.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Provider store={store}>
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
    </Provider>
  );
}
