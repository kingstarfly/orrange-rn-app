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
import { AppStackParamList } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";

export default function YourInfo() {
  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, "YourInfo">>();

  const onConfirmYourInfo = () => {
    console.log("Going to YourUsername page");
    if (!firstName || !lastName) {
      return alert("Please enter first and last name!");
    }
    console.log(firstName);
    console.log(lastName);
    navigation.navigate("YourUsername", { firstName, lastName });
  };

  const width = useWindowDimensions().width;

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authData = useAuth();

  useEffect(() => {
    async function isFirstLogin() {
      const uid = authData.userData.uid;
      const userDocument = await firestore
        .collection("users")
        .doc(String(uid))
        .get();
      if (userDocument.exists) {
        console.log("found user document, is not first time user: ", uid);
        navigation.navigate("MainBottomTabNavigator");
      } else {
        console.log(
          "unable to find user document id, so is first time user,: ",
          uid
        );
        setIsLoading(false);
        return;
      }
    }

    isFirstLogin();

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

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Container>
      <Div alignItems="center" justifyContent="center" mt={200}>
        <Div row mb={50}>
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
          w={width * 0.9}
          mb={10}
          placeholder="First Name"
          bg="transparent"
          onChangeText={setFirstName}
        />
        <Input
          w={width * 0.9}
          mb={10}
          placeholder="Last Name"
          bg="transparent"
          onChangeText={setLastName}
        />
        <Button
          onPress={onConfirmYourInfo}
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
