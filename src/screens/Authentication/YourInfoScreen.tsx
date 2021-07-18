import {
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Div, Input, Icon, Image, WINDOW_HEIGHT } from "react-native-magnus";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import { SignUpStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import LargeButton from "components/LargeButton";
import { BodyTextRegular, Heading } from "components/StyledText";

export default function YourInfoScreen() {
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, "YourInfoScreen">
    >();

  const width = useWindowDimensions().width;

  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const onConfirmYourInfo = () => {
    if (!firstName || !lastName) {
      return alert("Please enter first and last name!");
    }
    navigation.navigate("YourUsernameScreen", {
      firstName,
      lastName,
      imageUri,
    });
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

    if (!result.cancelled) {
      //@ts-ignore
      setImageUri(result.uri);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Div
          justifyContent="flex-start"
          alignItems="center"
          mt={WINDOW_HEIGHT * 0.1}
          flex={1}
        >
          <Div alignSelf="center" mb={WINDOW_HEIGHT * 0.05} row>
            <Div flex={1}>
              <Heading mb={20}>Your Info</Heading>
              <BodyTextRegular>
                Please enter your name and upload a photo
              </BodyTextRegular>
            </Div>
            <Div>
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
        </Div>
        <Div
          bottom={WINDOW_HEIGHT * 0.02}
          position="absolute"
          alignSelf="center"
        >
          <LargeButton title="NEXT" onPress={onConfirmYourInfo} />
        </Div>
      </KeyboardAvoidingView>
    </Container>
  );
}
