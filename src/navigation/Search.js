import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Heading, Input, Button } from 'native-base';
import { db } from '../config.js'
import { style, width } from "styled-system";

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
            db.collection("companies").add({
              companyName: text,
          })
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
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
      // alignSelf: "stretch",
      // backgroundColor: "#fff023",
      // borderWidth: 1,
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