import {
  useWindowDimensions,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Div, Text, Input, Icon, Image } from "react-native-magnus";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "lib/auth";
import { firestore } from "lib/firebase";
import { AppStackParamList, SignUpStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import LargeButton from "components/LargeButton";
import { BodyTextRegular, Heading } from "components/StyledText";

export default function YourInfo() {
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, "YourInfo">>();

  const width = useWindowDimensions().width;

  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const onConfirmYourInfo = () => {
    if (!firstName || !lastName) {
      return alert("Please enter first and last name!");
    }
    navigation.navigate("YourUsername", { firstName, lastName, imageUri });
  };

  useEffect(() => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //@ts-ignore
      setImageUri(result.uri);
    }
  };

  return (
    <Container>
      <Div flex={1} justifyContent="center" alignItems="center">
        <Div row mb={100}>
          <Div flex={2}>
            <Heading mb={24}>Your Info</Heading>
            <BodyTextRegular>
              Please enter your name and upload a photo
            </BodyTextRegular>
          </Div>
          <Div flex={1}>
            <TouchableOpacity onPress={pickImage}>
              {imageUri ? (
                <Image
                  h={100}
                  w={100}
                  m={10}
                  rounded="circle"
                  source={{
                    uri: imageUri,
                  }}
                />
              ) : (
                <Icon
                  name="camera"
                  rounded="circle"
                  fontSize="5xl"
                  bg="#d1d1d1"
                  w={100}
                  h={100}
                />
              )}
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
