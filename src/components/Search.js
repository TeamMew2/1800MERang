import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Heading, Input, Button } from 'native-base';

export default function Search() {
  const placeholderText = "Search Company Name";
  const titleText = "Find service desk fast";
  const subtitleText = "and get the help you need.";
  const [text, setText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
            fetch(`http://192.168.1.221:3000/?company=${text}&lng=${40.7070658}&lat=${-74.4173763}`)
            .then(res => {
             return res.json()
            })
            .then(res => {
              console.log(res)
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