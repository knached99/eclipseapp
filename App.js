import React, {useState, useCallback, useMemo} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPwd from './screens/ForgotPwd';
// Import Paper Theme Provider 
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  useTheme, Appbar, TouchableRipple, Switch
} from 'react-native-paper';

// Import Theme Provider 
import { PreferencesContext } from './provider/themeContext';


// Define light and dark themes 
const DefaultTheme = PaperDefaultTheme;
const DarkTheme = PaperDarkTheme;

// Create Stack Object 
const Stack = createNativeStackNavigator(); 

// Create header to toggle between light and dark modes 

export default function App() {

  // Toggle between light and dark mode
  const [isThemeDark, setIsThemeDark] =useState(false);
  let theme = isThemeDark ? DarkTheme : DefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <>
    <PreferencesContext.Provider value={preferences}>
    <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}>
    <Stack.Navigator initialRouteName="Login" 
     screenOptions={{
      headerTintColor:  isThemeDark ? '#fff' : '#000',
      headerStyle: isThemeDark ? '#000' : '#fff'
     }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPwd" component={ForgotPwd} />
    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  </PreferencesContext.Provider>
  </>
  
);
    {/*<View style={styles.container}>
      <Text>Eclipse App</Text>
      <StatusBar style="auto" />
  </View> */}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
