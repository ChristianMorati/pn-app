import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootNavigator } from './src/router/RootNavigator';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { ToasterDark } from './src/components/layout/toaster';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
      <ExpoStatusBar backgroundColor={"black"}/>
      <ToasterDark />
    </Provider>
  );
}

export default App;