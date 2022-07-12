import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native'
import React, {useLayoutEffect} from 'react'
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


const Signup = ({navigation}) => {

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackTitle: 'back to login'
        });
    
    },
    [navigation]);
const signupValidationSchema = yup.object().shape({
    fName: yup 
    .string() 
    .required('Your first name is required')
    .min(3, ({ min, value }) => `${min - value.length} characters to go`)
    .max(20, ({max, value})=> `First name cannot exceed ${max} characters` ),

    lName: yup 
    .string()
    .required('Your last name is required')
    .min(3, ({ min, value }) => `${min - value.length} characters to go`)
    .max(20, ({max, value})=> `Last name cannot exceed ${max} characters` ),

    email: yup 
    .string()
    .required('Your email is required')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),

    pwd: yup
    .string()
    .required('Your password is required')
    .min(8, ({min, value})=> `${min - value.length} characters remaining`)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Your password is not strong enough'),

    retypePwd: yup 
    .string() 
    .required('You must retype your password')
    .oneOf([yup.ref('pwd')], 'both passwords must match')

})
  return (
    <>
    <StatusBar style="dark" />
    <View style={styles.body}>
     <Card style={styles.card}>
        <Card.Content>
            <Title style={styles.title}>Create Account</Title>
            <Paragraph style={styles.message}>{/* Error messages go here */}</Paragraph>
        </Card.Content>

        <Card.Actions>
            <Formik
            validationSchema={signupValidationSchema}
            initialValues={{fName: '', lName: '', email: '', pwd: '', retypePwd: ''}}
            onSubmit={values => console.log(values)}
            >
             {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
             <View>
                <TextInput style={styles.input} 
                name="fName"
                label="First Name"
                mode="outlined"
                onChangeText={handleChange('fName')} 
                onBlur={handleBlur('fName')}
                value={values.fName}
                error={(errors.fName && touched.fName) ? true : false}
                />
                {(errors.fName && touched.fName) && <HelperText style={styles.error}>{errors.fName}</HelperText>}
                
                <TextInput style={styles.input} 
                name="lName"
                label="Last Name"
                mode="outlined"
                onChangeText={handleChange('lName')} 
                onBlur={handleBlur('lName')}
                value={values.lName}
                error={(errors.lName && touched.lName) ? true : false}
                />
                {(errors.lName && touched.lName) && <HelperText style={styles.error}>{errors.lName}</HelperText>}

                <TextInput style={styles.input} 
                name="email"
                label="Email"
                mode="outlined"
                onChangeText={handleChange('email')} 
                onBlur={handleBlur('email')}
                value={values.email}
                error={(errors.email && touched.email) ? true : false}
                />
                {(errors.email && touched.email) && <HelperText style={styles.error}>{errors.email}</HelperText>}

                <TextInput style={styles.input} 
                name="pwd"
                label="Password"
                mode="outlined"
                onChangeText={handleChange('pwd')} 
                onBlur={handleBlur('pwd')}
                value={values.pwd}
                error={(errors.pwd && touched.pwd) ? true : false}
                secureTextEntry={true}
                />
                {(errors.pwd && touched.pwd) && <HelperText style={styles.error}>{errors.pwd}</HelperText>}

                <TextInput style={styles.input} 
                name="retypePwd"
                label="Confirm Password"
                mode="outlined"
                onChangeText={handleChange('retypePwd')} 
                onBlur={handleBlur('retypePwd')}
                value={values.retypePwd}
                error={(errors.retypePwd && touched.retypePwd) ? true : false}
                secureTextEntry={true}
                />
                {(errors.retypePwd && touched.retypePwd) && <HelperText style={styles.error}>{errors.retypePwd}</HelperText>}

                <Button mode="contained" style={styles.button}>Create Account</Button>
             </View>
             )}

            </Formik>
        </Card.Actions>
     </Card>
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
        color: '#000',
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

export default Signup