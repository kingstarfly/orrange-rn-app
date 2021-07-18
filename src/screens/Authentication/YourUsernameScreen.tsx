import {
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Button,
  Div,
  Text,
  Input,
  Overlay,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from "react-native-magnus";
import React, { useState } from "react";
import { firestore, auth, storage } from "lib/firebase";
import { useAuth } from "lib/auth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackParamList, SignUpStackParamList, UserData } from "types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import Container from "components/Container";
import LargeButton from "components/LargeButton";
import * as ImageManipulator from "expo-image-manipulator";
import { DUMMY_USER_ID } from "constants/mockdata";
import { DB } from "lib/api/dbtypes";
import Loading from "components/Loading";
import { theme } from "constants/theme";
import { BodyTextRegular, Heading } from "components/StyledText";

export default function YourUsername() {
  const route =
    useRoute<RouteProp<SignUpStackParamList, "YourUsernameScreen">>();
  const navigation =
    useNavigation<
      StackNavigationProp<SignUpStackParamList, "YourUsernameScreen">
    >();
  const authData = useAuth();

  const phoneNumber = authData.userData.contact;
  const { firstName, lastName, imageUri } = route.params;
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function uploadImageAsync(uri: string, folder: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = storage.ref(`${folder}/${username}`);
    //@ts-ignore
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    //@ts-ignore
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  const onConfirmYourUsername = async () => {
    if (!username) return alert("Please enter a username!");

    setIsLoading(true);
    let thumbnailUri = null;
    let url_original = null;
    let url_thumbnail = null;

    if (imageUri) {
      try {
        // Resize image to get thumbnail size
        const manipResult = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 50, height: 50 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        thumbnailUri = manipResult.uri;
      } catch (error) {
        console.error(error);
      }
    }

    if (imageUri && thumbnailUri) {
      try {
        // upload original and thumbnail pictures to storage and get the urls
        url_original = await uploadImageAsync(imageUri, "original");
        url_thumbnail = await uploadImageAsync(thumbnailUri, "thumbnail");
      } catch (error) {
        console.error(error);
      }
    }

    //check if username is not taken
    firestore
      .collection("users")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size != 0) {
          return alert("Username is already taken!");
        } else {
          // !! TODO CHANGE THIS: Doing this to mock user
          // authData.updateUserInfo({
          //   uid: authData.userData.uid,
          //   firstName: firstName,
          //   lastName: lastName,
          //   username: username,
          //   contact: phoneNumber,
          //   url_original: url_original,
          //   url_thumbnail: url_thumbnail,
          // } as UserData);

          firestore
            .collection(DB.USERS)
            .doc(DUMMY_USER_ID)
            .get()
            .then((doc) => {
              authData.updateUserInfo(doc.data() as UserData);
            });
        }
      });

    setIsLoading(false);
  };

  const width = useWindowDimensions().width;
  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Div
          alignItems="center"
          justifyContent="center"
          mt={WINDOW_HEIGHT * 0.1}
        >
          <Heading mb={20}>Your Username</Heading>
          <BodyTextRegular mb={40} textAlign="center" w={width * 0.8}>
            Enter your preferred username below. You may change it later on
          </BodyTextRegular>

          <Input
            fontSize={16}
            w={width * 0.8}
            autoCapitalize="none"
            placeholder="Username"
            prefix={<BodyTextRegular>@</BodyTextRegular>}
            maxLength={20}
            bg="transparent"
            onChangeText={setUsername}
          />
        </Div>
        <Div
          bottom={WINDOW_HEIGHT * 0.02}
          position="absolute"
          alignSelf="center"
        >
          <LargeButton title="NEXT" onPress={onConfirmYourUsername} />
        </Div>
        <Overlay
          justifyContent="center"
          alignItems="center"
          visible={isLoading}
          overlayColor="black"
          bg={theme.colors.backgroundlight}
          overlayOpacity={0.65}
        >
          <Div h={WINDOW_HEIGHT * 0.3} w={WINDOW_WIDTH * 0.7}>
            <Loading />
          </Div>
        </Overlay>
      </KeyboardAvoidingView>
    </Container>
  );
}
