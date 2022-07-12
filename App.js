import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPwd from './screens/ForgotPwd';
const Stack = createNativeStackNavigator(); 
export default function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" 
     screenOptions={{
      headerTintColor: 'black',
      headerStyle: {backgroundColor: '#fff'}
     }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPwd" component={ForgotPwd} />
    </Stack.Navigator>
  </NavigationContainer>
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
