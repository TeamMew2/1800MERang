import { Row } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch,Button} from "react-native";
import {Linking,Platform} from 'react-native';
import { width } from "styled-system";


export default function Fav(props) {

  const dialCall = (number) => {               
    console.log('dailing',number)
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);  
  };


  return (
    <View style={styles.container}>
      {/* <View style = {styles.containerInner}> */}
      <Text style={styles.name}>Company Name</Text>
      <Text style={styles.number}>1-800-123-4567</Text>      
      {/* </View> */}
      <Button
        title='Call'  
        onPress={() => dialCall('1-800-123-4567')}
        /> 
    </View>
  )

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'row',           
      padding: 10,
  },
  containerInner: {
    flex: 1,
    backgroundColor: "#fff",
    
  }
});