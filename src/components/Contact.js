import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text,Button} from "react-native";
import { height } from "styled-system";

export default function Contact(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.text}</Text>
      <Text style={styles.number}>1-800-123-4567</Text>
      
      <Button 
        style={styles.callButton}    
        onPress={() => console.log('clicking')} 
        title = "Call"   
        backgroundColor="#00989d"       
        accessibilityLabel="Search for company numbers with this purple button"
      >        
      </Button>
      
      
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
    }
  });
