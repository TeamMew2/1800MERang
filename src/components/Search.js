import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Heading, Input, Button } from 'native-base';
import { flex } from "styled-system";
import Contact from "./Contact";
import * as Location from 'expo-location';



export default function Search() {
  const placeholderText = "Search Company Name";
  const titleText = "Find service desk fast";
  const subtitleText = "and get the help you need.";
  const [text, setText] = useState("");
  const [resultFlag,setresultFlag] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let status = 'Waiting..';
  if (errorMsg) {
    status = errorMsg;
  } else if (location) {
    status = JSON.stringify(location);
    console.log(location.coords.latitude, location.coords.longitude)
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading size="xl" paddingBottom="1">{titleText}</Heading>
        <Text style={styles.subtitle}>{subtitleText}</Text>
        <StatusBar style="auto" />
        <Input
          style={styles.search}
          variant="rounded"
          placeholder={placeholderText}
          defaultValue={text}
          onChangeText={(text) => {
            setText(text);
            text === "" ? setButtonDisabled(true) : setButtonDisabled(false);
          }}
          _light={{
            placeholderTextColor: "blueGray.400",
          }}
          _dark={{
            placeholderTextColor: "blueGray.50",
          }}
        />
        <Button
          onPress={() => {
            fetch(`http://localhost:3000/?company=${text}?lat=${location.coords.latitude}?lng=${location.coords.longitude}`)
            .then(res => {
             return res.json()
            })
            .then(res => {
              setresultFlag(true);
              console.log(res.message)
            })
            .catch(err => {
              console.log(err.message)
              throw err
            })
          }}
          disabled={buttonDisabled}
          backgroundColor="#00989d"
          marginTop={5}
          accessibilityLabel="Search for company numbers with this purple button"
        >
          Search
        </Button> 
        <Contact text={text} />       
      </View>            
    </View>
    
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    header: {
      paddingTop: 100,
      paddingBottom: 20,
    },
    subtitle: {
      fontSize: 20,
      marginBottom: 20,
    },
    search: {
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
    },
    
  });