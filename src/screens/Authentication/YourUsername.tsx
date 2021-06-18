import { useWindowDimensions, View } from "react-native";
import { Button, Div, Text, Input } from "react-native-magnus";
import React, { useState } from "react";
import { firestore, auth } from "lib/firebase";
import { useAuth } from "lib/auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackParamList, SignUpStackParamList, UserData } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import Container from "components/Container";
import LargeButton from "components/LargeButton";

export default function YourUsername() {
  const route = useRoute<RouteProp<SignUpStackParamList, "YourUsername">>();
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, "YourUsername">>();
  const authData = useAuth();

  const phoneNumber = authData.userData.contact;
  const { firstName, lastName } = route.params;
  const [username, setUsername] = useState("");

  const onConfirmYourUsername = async () => {
    if (!username) return alert("Please enter a username!");

    console.log("Going to main bottom tab navigator");
    console.log("username", username);
    console.log("firstname", firstName);
    console.log("lastname", lastName);

    //check if username is not taken
    await firestore
      .collection("users")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        console.log("other users with the same username: ", querySnapshot.size);
        if (querySnapshot.size != 0) {
          return alert("Username is already taken!");
        } else {
          console.log("Username is unique! Continuing to next page");
          authData.updateUserInfo({
            uid: authData.userData.uid,
            firstName: firstName,
            lastName: lastName,
            username: username,
            contact: phoneNumber,
            url_original: null,
            url_thumbnail: null,
          } as UserData);
        }
      });
  };

  const width = useWindowDimensions().width;
  return (
    <Container>
      <Div flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={40} mb={20}>
          Your Username
        </Text>
        <Text fontSize={20} mb={20}>
          Enter your preferred username below
        </Text>
        <Input
          mt={0.2 * width}
          mb={0.1 * width}
          fontSize={20}
          autoCapitalize="none"
          w={width * 0.8}
          placeholder="Username"
          bg="transparent"
          onChangeText={setUsername}
        />

        <LargeButton title="NEXT" onPress={onConfirmYourUsername} />
      </Div>
    </Container>
  );
}
