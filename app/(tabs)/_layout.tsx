import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from '../../app/_layout'; // Adjust the import path as necessary
import ProfileDrawer from '../../config/DrawerNavigator'; // Update the import path
import { DrawerLayout } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <ProfileDrawer />
    </NavigationContainer>
  );
}
