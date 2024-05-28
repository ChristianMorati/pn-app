import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './src/pages/home';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <View>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}
