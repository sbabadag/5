
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from './(tabs)/index';
import CategorySelection from './CategorySelection';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CategorySelection" component={CategorySelection} options={{ title: 'Select Categories' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;