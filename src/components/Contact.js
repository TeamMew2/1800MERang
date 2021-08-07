import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch,Image, TouchableOpacity} from "react-native";
import { Button } from "native-base";
import { height } from "styled-system";
import {Linking,Platform} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Contact(props) {
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
          
        </View>
          
      </View>
      <View style={styles.lowerContainer}>
        <Button variant="none" onPress={toggleFavorite}>
          <FontAwesome name={isEnabled ? "star" : "star-o"} size={50} color={"#00989d"} />
        </Button>
        <FontAwesome name="phone" size={50} color="#00989d" />
        
        <Button
          onPress={() => dialCall(props.number)}
          backgroundColor="white"
          style={{borderColor: "#00989d", height: 50}}
          variant="outline"
          >
          <Text style={{color: "#00989d"}}>{props.number}</Text>
        </Button>
            {/* <Text style={styles.number}>{props.number}</Text>     */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    upperContainer: {
      flex: 1,      
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",  
      paddingTop: 20
      
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
