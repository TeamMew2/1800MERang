import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PhoneSignIn from './PhoneSignIn';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Welcome Home</Text>
      <PhoneSignIn></PhoneSignIn>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 10,
    },
  });
