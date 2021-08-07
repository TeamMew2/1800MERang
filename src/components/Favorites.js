import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Heading, HStack, Stack, Center } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Contact from "./Contact";
import Fav from './Fav';

export default function Favorites() {
  const [userID, setUserID] = useState('ayemmoe');

  useEffect(() => {          
    fetch(`http://192.168.181.128:3000/userFavorites/?userId=${userID}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .then(err => {
        console.log(err)
      }) 
    
  }, []);

  return (
    <View style={styles.container}>
      <Heading size="xl" paddingBottom="1">Favorites</Heading>
      <Fav></Fav>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingTop: 100,
    },
    center: {
    }
  });
