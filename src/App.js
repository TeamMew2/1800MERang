import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Home from "./components/Home";
import Search from "./components/Search";
import Favorites from "./components/Favorites";

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link
            to="/"
            style={styles.navItem}
            underlayColor="#f0f4f7">
            <Text>Home</Text>
          </Link>
          <Link
            to="/search"
            style={styles.navItem}
            underlayColor="#f0f4f7">
            <Text>Search</Text>
          </Link>
          <Link
            to="/favorites"
            style={styles.navItem}
            underlayColor="#f0f4f7">
            <Text>Faves</Text>
          </Link>
        </View>

        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/favorites" component={Favorites} />
      </View>
    </NativeRouter>
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
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
});
