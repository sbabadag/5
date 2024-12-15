import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/AppNavigator';
import { CategoryProvider } from './app/CategorySelection'; // Correct import path

export default function App() {
  return (
    <CategoryProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CategoryProvider>
  );
}