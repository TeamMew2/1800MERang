import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable, 
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as auth from './authentication'

const SignIn = (props) => {

    const [email, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [signIn, setSignIn] = React.useState(true)

    const handleChange = (event, type) => {
        if(type === 'email') {
            setUsername(event)
        }  else if (type === 'password') {
            setPassword(event)
        } 
      }
    
      const handleSubmit = () => {
        if(signIn === true ) {
            auth.loginUser(email, password)
            setUsername('')
            setPassword('')
        } else {
            auth.createUserAccount({email: email, password: password})
            .then(() => auth.loginUser(email, password))
            .then(() => {setUsername('')
            setPassword('')})
        } 
      }
      

    let signingIn = (
        <View>
        </View>
    )
    
    let selector = "Log In"
    let title = "Sign Up"

   if(signIn === true) {
    signingIn = <View></View>
    title="Sign In"
    selector = "Sign Up"
   } 
   
   return ( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
   <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style ={styles.formControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={(text)=>handleChange(text, 'email')} 
            />
        </View>
      <View style ={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
              style={styles.input} 
              value={password} 
              secureTextEntry={true}
              onChangeText={(text)=>handleChange(text, 'password')} 
          />
      </View>
      {/* <TextInput  id="custom-css-standard-input" value={email} onChange={(e) => handleChange(e, 'email')} type="text" placeholder="Email"/>
      <TextInput  id="custom-css-standard-input" value={password} onChange= type="password" placeholder="Password"/> */}
      {signingIn}
    <Pressable style={styles.button} onPress={()=>handleSubmit()}>
      <Text style={{ fontSize: '15px', color: 'white'}}>Submit</Text>
    </Pressable>
    <Pressable style={styles.button}  onPress={() => {setSignIn(!signIn)}}>
      <Text style={{ fontSize:'15px', color: 'white'}}>{selector}</Text>
    </Pressable>
    </View>
    </TouchableWithoutFeedback>
    
    )
}

const styles = StyleSheet.create({
    container: {
      height: "90%",
      width: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      margin: 10,
      backgroundColor: '#00989d',
    },
    title: {
      color: '#00989d',
      fontWeight: 'bold',
      fontSize: 30,
    },
    formControl: {
      width: '100%'
  },
  label: {
      marginVertical: 8
  },
  input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
  },
  });


export default SignIn