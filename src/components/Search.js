import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { db } from '../config.js'

export default function Search() {
  const placeholderText = "Enter company name...";
  const [text, setText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text>1-800MERANG</Text>
      <StatusBar style="auto" />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          padding: 10,
          margin: 20,
        }}
        placeholder={placeholderText}
        defaultValue={text}
        onChangeText={(text) => {
          setText(text);
          text === "" ? setButtonDisabled(true) : setButtonDisabled(false);
        }}
      />
      <Text>input text: {text}</Text>
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
        title="Search"
        color="#007AFF"
        accessibilityLabel="Search for company numbers with this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });