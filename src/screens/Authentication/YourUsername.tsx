import { useWindowDimensions, View } from "react-native";
import { Button, Div, Text, Input } from "react-native-magnus";
import React, { useState } from "react";
import { firestore, auth } from "lib/firebase";
import { useAuth } from "lib/auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackParamList, SignUpStackParamList, UserData } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import Container from "components/Container";

export default function YourUsername() {
  const route = useRoute<RouteProp<SignUpStackParamList, "YourUsername">>();
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, "YourUsername">>();
  const authData = useAuth();

  const phoneNumber = auth.currentUser.phoneNumber;
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
            uid: auth.currentUser.uid,
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
      <Div alignItems="center" justifyContent="center" mt={200}>
        <Text fontSize={40}>Your Username</Text>
        <Text>Enter your preferred username below</Text>
        <Input
          autoCapitalize="none"
          w={width * 0.9}
          mb={10}
          placeholder="Username"
          bg="transparent"
          onChangeText={setUsername}
        />
        <Button
          onPress={onConfirmYourUsername}
          alignSelf="center"
          w={width * 0.9}
          rounded="circle"
          bg="#FAB77C"
        >
          <Text>Next</Text>
        </Button>
      </Div>
    </Container>
  );
}
