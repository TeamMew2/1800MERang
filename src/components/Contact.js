import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch,Button} from "react-native";
import {Linking,Platform} from 'react-native';


export default function Contact(props) {
  const [isEnabled, setIsEnabled] = useState(false);
 
  const toggleSwitch = () => {    
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
      <Text style={styles.name}>{props.text}</Text>
      <Text style={styles.number}>{props.number}</Text>      
      
      <Button
        title='Call'  
        onPress={() => dialCall(props.number)}
        /> 
        
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
    }
  });
