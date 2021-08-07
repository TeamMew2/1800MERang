import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable, 
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { flexDirection } from "styled-system";
import * as auth from '../Auth/authentication'

export default function Home() {

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
    <View style={styles.mainContainer}>
    <View style={styles.picContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/team-jmexclusives.png")}
        />
      <Text style={styles.title}>1-800-MERANG</Text>
    </View>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Text style={styles.authTitle}>{title}</Text>
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
          <Pressable style={styles.button} onPress={()=>handleSubmit()}>
            <Text style={{ fontSize: '15', color: 'white'}}>Submit</Text>
          </Pressable>
          <Pressable style={styles.button}  onPress={() => {setSignIn(!signIn)}}>
            <Text style={{ fontSize:'15', color: 'white'}}>{selector}</Text>
          </Pressable>
        </View>
    </TouchableWithoutFeedback>
 </View>


  );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%"
      
    },  
    picContainer: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      padding: 10,
    },
    logo: {
      height: 500,
      width: 500,
      paddingBottom: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#00989d",
    },
    container: {
      height: "50%",
      width: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 4,
      elevation: 3,
      marginTop: 10,
      backgroundColor: '#00989d',
    },
    authTitle: {
      marginTop: 50,
      color: '#00989d',
      fontWeight: 'bold',
      fontSize: 20,
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
