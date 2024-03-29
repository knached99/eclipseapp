import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, {useState} from 'react'
import * as yup from 'yup'
import axios from 'axios';
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

const Login = ({navigation}) => {
const [errorMsg, setErrorMsg] = useState(null);
const [successMsg, setSuccessMsg] = useState(null);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),
    password: yup
      .string()
      .required('Your password is required')
  })
  return (
    <>
     <StatusBar style="dark" />
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'space-around'}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Card>
    <Card.Content>
      <Title style={styles.title}>Eclipse Login</Title>

      <Paragraph style={styles.error}>{ errorMsg ? errorMsg : ""}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1573120525707-4549889744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' }} />
    <Card.Actions>
      
    <Formik
    validationSchema={loginValidationSchema}
     initialValues={{ email: '', password: '' }}
     onSubmit={async(values)=> {
      setErrorMsg(null);
      const response = await axios 
      .post('http://localhost:5000/api/v1/login', values)
      .catch((err)=>{
        if(err && err.reponse)
        setErrorMsg(err.response.data.message);
        setSuccessMsg(null);
        
      });
      if(response){
        setSuccessMsg(response.data.message);
      }
     }
    }
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
                 <TextInput
                  name="password"
                  mode="outlined"
                  label="Password"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  error={(errors.password && touched.password) ? true: false}
                />
                {(errors.password && touched.password) && <HelperText style={styles.error}>{errors.password}</HelperText>}
                
        <Button mode="contained" style={styles.button}  onPress={handleSubmit} disabled={!isValid}>Login</Button>
        <Button style={styles.link} onPress={()=> navigation.navigate('Signup')}>No Account?</Button>
        <Button  style={styles.link} onPress={()=>navigation.navigate('ForgotPwd')}>Forgot Password?</Button>
        <View style={{height: 100}}></View>
       </View>
     )}
   </Formik>
    </Card.Actions>
  </Card>
  </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  color: '#000',
  marginTop: 30,
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
},
link:{
  margin: 5
}
});

export default Login