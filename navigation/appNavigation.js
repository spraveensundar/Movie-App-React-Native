import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MoiveScreen from '../screens/MoiveScreen';
import PersonScreen from '../screens/PersonScreen';
import SeachScreen from '../screens/SeachScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MoiveScreen}/>
        <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen}/>
        <Stack.Screen name="Search" options={{headerShown:false}} component={SeachScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;