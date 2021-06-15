import { View } from "react-native";
import React from "react";
import { Button, Text, Div } from "react-native-magnus";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "types/types";

export default function StartScreen() {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, "Start">>();
  const onLoginPress = () => {
    console.log("Login button pressed");
    navigation.navigate("Login");
  };
  return (
    <View>
      <Div alignItems="center" justifyContent="center" mt={210}>
        <Text fontSize={30}>Welcome to</Text>
        <Text color="#F78826" fontSize={100} fontWeight="500">
          tootle
        </Text>
        <Button
          mt={300}
          alignSelf="center"
          bg="#FAB77C"
          rounded="circle"
          onPress={onLoginPress}
        >
          <Text>LOGIN</Text>
        </Button>
      </Div>
    </View>
  );
}
