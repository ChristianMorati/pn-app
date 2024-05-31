import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootNavigator } from './src/router/RootNavigator';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
      <ExpoStatusBar backgroundColor={"black"}/>
    </Provider>
  );
}

export default App;