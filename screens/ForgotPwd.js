import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import * as yup from 'yup'
import {
    Card,
    Title,
    Paragraph,
    List,
    Provider as PaperProvider,
    Button,
    TextInput,
    HelperText,
  } from 'react-native-paper';
  
import {Formik} from 'formik';
import { StatusBar } from 'expo-status-bar';

const ForgotPwd = ({navigation}) => {

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),
 
  })
  return (
    <>
     <StatusBar style="dark" />
    <View >
      <KeyboardAvoidingView>
    <Card>
    <Card.Content>
      <Title style={styles.title}>Forgot Password?</Title>
      <Paragraph>No worries, just follow the instructions and you'll be able to reset your password</Paragraph>
      <Paragraph style={styles.message}>{/* Error messages go here */}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1573120525707-4549889744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' }} />
    <Card.Actions>
      
    <Formik
    validationSchema={loginValidationSchema}
     initialValues={{ email: '', password: '' }}
     onSubmit={values => console.log(values)}
   >
    
     {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
       <View>
             <TextInput
                  name="email"
                  label="Email Address"
                  style={styles.input}
                  mode="outlined"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  error={(errors.email && touched.email) ? true: false}
                /> 
                {(errors.email && touched.email) && <HelperText type="error" style={styles.error}>{errors.email}</HelperText>}
               
                
        <Button mode="contained" style={styles.button}  onPress={handleSubmit} disabled={!isValid}>Send Reset Request</Button>
        <View style={{height: 100}}></View>
       </View>
     )}
   </Formik>
    </Card.Actions>
  </Card>
  
  </KeyboardAvoidingView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
body:{
  backgroundColor: '#fff',
  height: '100%',
},
card:{
  margin: 10,
  padding: 0,
  backgroundColor: '#fff'
},
title:{
  textAlign: 'center',
  fontWeight: '900',
  color: '#fff',
  margin: 10,
  fontSize: 30
},
error:{
  textAlign: 'left',
  color: '#e02872',
  fontWeight: 'normal'
},
input:{
  width: 340,
  margin: 10,

},
button: {
  margin: 10,
  padding: 10,
}
});

export default ForgotPwd