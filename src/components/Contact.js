import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch,Image,Button, TouchableOpacity} from "react-native";
import { height } from "styled-system";
import {Linking,Platform} from 'react-native'
// import * as RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export default function Contact(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [form, setForm] = useState({})
  const [isEnabled, setIsEnabled] = useState(false);
 
  const toggleSwitch = () => {
    console.log('isEnabled first time', isEnabled)
    setIsEnabled(!isEnabled)
    // setTimeout(
    //   () => { console.log('waiting') },
    //   3000
    // )

    console.log('isEnabled', isEnabled)
    if(isEnabled) {
      const data = {
        number:props.number,
        company:props.text
      };

      console.log('isEnable',isEnabled)     
      console.log('writing to file ',data)
      // FileSystem.writeAsStringAsync('../testData/fav.json',data,FileSystem.EncodingType.UTF8)
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err.message,err.code);
      // })
      
    }
  }

  useEffect(() => {
    if(isEnabled) {
      const data = {
        number:props.number,
        company:props.text
      };

      console.log('isEnable',isEnabled)     
      console.log('writing to file ',data)
      // FileSystem.writeAsStringAsync('../testData/fav.json',data,FileSystem.EncodingType.UTF8)
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err.message,err.code);
      // })
      
    }
  }, []);

  const dialCall = (number) => {               
    console.log('dailing',number)
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);  
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Favorite</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
        />
      </View>
      <Text style={styles.name}>{props.text.toUpperCase()}</Text>
      <Text style={styles.number}>{props.number}</Text>      
      
      <Button
        title='Call'  
        onPress={() => dialCall(props.number)}
        /> 
      
      {/* <TouchableOpacity style={styles.btn} >
        <View style={styles.absoluteView}>
            <Text>title</Text>
        </View>
        <Image 
        source={require("../assets/phone_icon.png")}  
        style={styles.phone}
        onPress={() => dialCall(props.number)}
        />
    </TouchableOpacity> */}      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'row', 
      marginTop: 50,     
      padding: 10,
    },
    name: {      
      color: '#FF0000',
      
    },
    number: {      
      color:'#0000FF'
    },
    callButton: {
      width:"50%"
    },
    phone: {
      height: 30,
      width: 30,
      paddingBottom: 20,    
    },
    absoluteView: {
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    btn: {
      
    }

  });
