import { Row } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {Linking,Platform} from 'react-native';



export default function Fav(props) {

  const dialCall = (number) => {               
    console.log('dailing',number)
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);  
  };

  

  return (
    <View style={styles.fav}>
      <View style ={styles.titleArea}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{props.company}</Text>
        <TouchableOpacity
          underlayColor='#fff'
          style = {styles.deleteButton}
          onPress = {() => props.removeFav(props.ID)}
        >
          <Image style={styles.deleteText} 
          source={require("../assets/remove.jpg")}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoArea}>      
        <Text style={styles.number}>{props.number}</Text>     
        <TouchableOpacity          
          onPress={() => dialCall(props.number)}
          underlayColor='#fff'
          style={styles.callButton}
        > 
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

 
}

const styles = StyleSheet.create({
  fav: {
    flex: 0.2,
    width : "90%",    
    backgroundColor: "#fff",    
    justifyContent: "space-between",    
    marginTop: 5,
    marginBottom: 5,      
    
  },

  titleArea: {
    flexDirection:'row',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    
  },

  infoArea: {
    flexDirection:'row',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderColor: 'gray',
    borderBottomWidth:1,   
  },

  name : {
    width: 200,
    fontSize: 16,
    fontWeight: 'bold'
    
  },
  
  deleteButton: {    
    borderColor: '#fff'
  },

  deleteText: {
    width: 30,
    height: 30
  },

  callButton: {   
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#167D7F',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  callText: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }


});