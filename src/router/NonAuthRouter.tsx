import * as React from 'react';
import AuthScreen from '../pages/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function NonAuthRouter() {
  return (
    <Stack.Navigator
      initialRouteName='Auth'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default NonAuthRouter;