import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/logo.png'),
  require('./assets/logo.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
