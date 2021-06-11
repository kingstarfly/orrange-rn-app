import { Route } from "@react-navigation/native";
import {
  Scene,
  StackHeaderProps,
} from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type HeaderProps = Pick<StackHeaderProps, "previous" | "navigation" | "scene">;

// TODO probably dont need header.

const Header = ({ previous, navigation, scene }: HeaderProps) => {
  return (
    <View style={{ backgroundColor: "red" }}>
      {/* <MyBackButton onPress={navigation.goBack} /> */}
      <Text style={{ color: "black" }}>Insert logo here</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;
