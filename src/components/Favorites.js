import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Text>Important Numbers Grid Here</Text>
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
