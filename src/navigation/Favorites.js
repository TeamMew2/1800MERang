import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Heading, HStack, Stack, Center } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Heading size="xl" paddingBottom="1">Favorites</Heading>
      <Stack space={2} alignItems="center" paddingTop={5}>
        <HStack space={2} alignItems="center">
          <Center
            size={138}
            bg="secondary.400"
            rounded="md"
            _text={{
              color: "white",
            }}
            shadow={3}
          >
            <Feather name="alert-triangle" size={50} color="white" />
            Emergency
          </Center>
          <Center
            size={138}
            bg="primary.400"
            rounded="md"
            _text={{
              color: "white",
            }}
            shadow={3}
          >
            <AntDesign name="medicinebox" size={50} color="white" />
            Health
          </Center>
        </HStack>
        <HStack space={2} alignItems="center">
          <Center
            size={138}
            bg="secondary.400"
            rounded="md"
            _text={{
              color: "white",
            }}
            shadow={3}
          >
            <SimpleLineIcons name="plane" size={50} color="white" />
            Travel
          </Center>
          <Center
            size={138}
            bg="primary.400"
            rounded="md"
            _text={{
              color: "white",
            }}
            shadow={3}
          >
            <Feather name="tool" size={50} color="white" />
            Home
          </Center>
        </HStack>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingTop: 100,
    },
    center: {
    }
  });
