import {
  useWindowDimensions,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Div, Text, Input, Icon } from "react-native-magnus";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "lib/auth";
import { firestore } from "lib/firebase";
import { AppStackParamList, SignUpStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import LargeButton from "components/LargeButton";
import { BodyMainText } from "components/StyledText";

export default function YourInfo() {
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, "YourInfo">>();

  const onConfirmYourInfo = () => {
    if (!firstName || !lastName) {
      return alert("Please enter first and last name!");
    }
    navigation.navigate("YourUsername", { firstName, lastName });
  };

  const width = useWindowDimensions().width;

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    //   async function isFirstLogin() {
    //     const uid = authData.userData.uid;
    //     const userDocument = await firestore
    //       .collection("users")
    //       .doc(String(uid))
    //       .get();
    //     if (userDocument.exists) {
    //       console.log("found user document, is not first time user: ", uid);
    //       navigation.navigate("MainBottomTabNavigator");
    //     } else {
    //       console.log(
    //         "unable to find user document id, so is first time user,: ",
    //         uid
    //       );
    //       setIsLoading(false);
    //       return;
    //     }
    //   }

    //   isFirstLogin();

    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //@ts-ignore
      setImage(result.uri);
    }
  };

  const authData = useAuth();

  return (
    <Container>
      <Div flex={1} justifyContent="center" alignItems="center">
        <Div row mb={100}>
          <Div flex={2} ml={50} mr={20}>
            <Text fontSize={40} mb={10}>
              Your Info
            </Text>
            <Text fontSize={15}>Please enter your name and upload a photo</Text>
          </Div>
          <Div flex={1}>
            <TouchableOpacity onPress={pickImage}>
              <Icon
                name="camera"
                rounded="circle"
                fontSize="5xl"
                bg="#d1d1d1"
                w={80}
                h={80}
              />
            </TouchableOpacity>
          </Div>
        </Div>
        <Input
          fontSize={20}
          w={width * 0.9}
          mb={30}
          placeholder="First Name"
          bg="transparent"
          onChangeText={setFirstName}
        />
        <Input
          fontSize={20}
          w={width * 0.9}
          mb={30}
          placeholder="Last Name"
          bg="transparent"
          onChangeText={setLastName}
        />

        <LargeButton title="NEXT" onPress={onConfirmYourInfo} />
      </Div>
    </Container>
  );
}
