import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/team-jmexclusives.png")}
        />
      <Text style={styles.title}>1-800MERANG</Text>
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
    logo: {
      height: 500,
      width: 500,
      paddingBottom: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#00989d",
    }
  });
