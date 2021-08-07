import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Heading, HStack, Stack, Center } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Contact from "./Contact";
import Fav from './Fav';
import { height } from "styled-system";

export default function Favorites() {
  const [userID, setUserID] = useState('ayemmoe');
  const [userData, setUserData] = useState([]);

  const removeFav = (item) => {
    fetch(`http://192.168.181.128:3000/removeFav/?id=${item}`)
    .then(res => res.json())
    .then(res => {
       console.log('userData',userData);
       fetch(`http://192.168.181.128:3000/userFavorites`)
      .then(res => res.json())
      .then(res => {
        
        const resultArr = [];

        const returnData = (resultObj) => {
          let count = 0;
          for (var key in resultObj) {
            // console.log(key, resultObj[key].phoneNumber, resultObj[key].companyName)
            resultArr.push(<Fav key={count} number={resultObj[key].phoneNumber} company={resultObj[key].companyName} ID={key} removeFav={removeFav}/>)
            count ++;
          }
        }

        console.log(resultArr)
        returnData(res);      
          
        
        setUserData(resultArr);
      })
      .then(err => {
        console.log(err)
      }) 
       
    })
    .then(err => {
      console.log(err)
    }) 
  }

  useEffect(() => {          
    fetch(`http://192.168.181.128:3000/userFavorites`)
      .then(res => res.json())
      .then(res => {
        
        const resultArr = [];

        const returnData = (resultObj) => {
          let count = 0;
          for (var key in resultObj) {
            // console.log(key, resultObj[key].phoneNumber, resultObj[key].companyName)
            resultArr.push(<Fav key={count} number={resultObj[key].phoneNumber} company={resultObj[key].companyName} ID={key} removeFav={removeFav}/>)
            count ++;
          }
        }

        
        returnData(res);      
          
        
        setUserData(resultArr);
      })
      .then(err => {
        console.log(err)
      }) 
    
  }, []);

  return (
    <View style={styles.container}>
      <Heading  style={styles.header} size="xl" paddingBottom="1">Favorites</Heading>
      {userData}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff", 
      width: '90%',
      alignItems: 'center',      
    },    
    header: {
      paddingTop: 20,     
    },
  });
