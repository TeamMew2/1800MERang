import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function Search() {
  const placeholderText = "Enter company name...";
  const [text, setText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const getData = async (placeName) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}'&key=${API_KEY}`,
      
    )
    let json = await response.json()
    console.log(json.results[0].place_id)
  }

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
        // onPress={() => Alert.alert(text)}
        onPress={() => getData(text)}
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
