import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Home from "./components/Home";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import { AntDesign } from '@expo/vector-icons'; 
import { NativeBaseProvider } from 'native-base';

export default function App() {

  return (
    <NativeBaseProvider>
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/favorites" component={Favorites} />

          <View style={styles.nav}>
            <Link
              to="/"
              style={styles.navItem}
              underlayColor="#f0f4f7">
              <AntDesign name="home" size={24} color="black" />
            </Link>
            <Link
              to="/search"
              style={styles.navItem}
              underlayColor="#f0f4f7">
              <AntDesign name="search1" size={24} color="black" />
            </Link>
            <Link
              to="/favorites"
              style={styles.navItem}
              underlayColor="#f0f4f7">
              <AntDesign name="hearto" size={24} color="black" />
            </Link>
          </View>
        </View>
      </NativeRouter>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 200,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingBottom: 50,
  },
  subNavItem: {
    padding: 5
  },
});
