import * as React from 'react';
import { Stack } from '..';
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from '../../screens';

function NonAuthRouter() {
  return (
    <Stack.Navigator
      initialRouteName='Sign In'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}//SignIn
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignupScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default NonAuthRouter;