import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect} from "react";
import { Keyboard, StyleSheet, Text, View, Alert } from "react-native";
import { Heading, Input, Button, Spinner, Center } from 'native-base';
import { flex } from "styled-system";
import Contact from "./Contact";
import * as Location from 'expo-location';



export default function Search() {
  const placeholderText = "Search Company Name";
  const titleText = "Find service desk fast";
  const subtitleText = "and get the help you need.";
  const [text, setText] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [number, setNumber] = useState("")
  const [resultFlag,setresultFlag] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let currentNum;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, });
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

  if(number) {
    currentNum = <Contact text={contactCompany} number={number}/>   
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
            Keyboard.dismiss();
            setButtonDisabled(true);
            setIsLoading(true);
            fetch(`http://192.168.1.185:3000/?company=${text}&lat=${location.coords.latitude}&lng=${location.coords.longitude}`)
            .then(res => {
             console.log('res', res)
             return res.json()
            })
            .then(res => {
              setresultFlag(true);
              console.log(res.phone_number);
              setNumber(res.phone_number);
              setContactCompany(text);
              setText('');
            })
            .catch(err => {
              console.log(err.message)
              throw err
            })
            .finally(() => {
              setIsLoading(false);
              setButtonDisabled(false);
            })
          }}
          disabled={buttonDisabled}
          backgroundColor="#00989d"
          marginTop={5}
          accessibilityLabel="Search for company numbers with this purple button"
        >
          Search
        </Button>
        {isLoading && <Spinner style={{margin: 50}} />}
        {currentNum}
            
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