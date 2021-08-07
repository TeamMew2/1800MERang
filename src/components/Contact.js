import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch,Image, TouchableOpacity} from "react-native";
import { Button } from "native-base";
import { height } from "styled-system";
import {Linking,Platform} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Contact(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [form, setForm] = useState({})
  const [isEnabled, setIsEnabled] = useState(false);
 
  const toggleFavorite = () => {    
    setIsEnabled(
    previousState => !previousState
    );    
  }  

  useEffect(() => {
  if(isEnabled) {
    const data = {
      number:props.number,
      company:props.text,
      userID: props.userID
    };

    
    fetch(`http://192.168.181.128:3000/favorites/?companyName=${props.text}&phoneNumber=${props.number}&userId=${props.userID}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .then(err => {
        console.log(err)
      })

  }
  }, [isEnabled]);

  const dialCall = (number) => {               
    console.log('dailing',number)
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);  
  };

  return (
    <View>
      <View style={styles.upperContainer}>
        <Text style={styles.name} style={{color: '#00989d', fontSize: 25}}>{props.text}</Text>        
        <View>
          {/* <Text></Text>
          <Switch
            trackColor={{ false: "#767577", true: "#00989d" }}
            thumbColor={"white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
          /> */}
        </View>
          
      </View>
      <View style={styles.lowerContainer}>
        <Button variant="none" onPress={toggleFavorite}>
          <FontAwesome name={isEnabled ? "star" : "star-o"} size={40} color={"#00989d"} />
        </Button>
        <Button
          onPress={() => dialCall(props.number)}
          backgroundColor="white"
          style={{borderColor: "#00989d"}}
          variant="none"
          >
          <Text style={{color: "#00989d", fontSize: 15}}>{props.number}</Text>
        </Button>
        <Button variant="none" onPress={() => dialCall(props.number)}>        
          <FontAwesome name="phone" size={40} color="#00989d" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    upperContainer: {
      flex: 1,
      // width : "80%",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'row', 
      marginTop: 50,     
      padding: 10,
      // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      // transition: "0.3s",
    },
    lowerContainer: {
      flex: 1,
      // width : "80%",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'row', 
      // marginTop: 50,     
      padding: 10,
    },
    name: {
      fontSize: 15,      
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
    }
  });
