import { useWindowDimensions, View } from "react-native";
import { Button, Div, Text, Input } from "react-native-magnus";
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

export default function YourUsername() {
  const route = useRoute<RouteProp<SignUpStackParamList, "YourUsername">>();
  const navigation =
    useNavigation<StackNavigationProp<SignUpStackParamList, "YourUsername">>();
  const authData = useAuth();

  const phoneNumber = authData.userData.contact;
  const { firstName, lastName, imageUri } = route.params;
  const [username, setUsername] = useState("");

  async function uploadImageAsync(uri: string, folder: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
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

    console.log("image and thumbnail uris");
    console.log(imageUri);
    console.log(thumbnailUri);

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
        console.log("other users with the same username: ", querySnapshot.size);
        if (querySnapshot.size != 0) {
          return alert("Username is already taken!");
        } else {
          console.log("Username is unique! Continuing to next page");

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
              console.log("Dummy user data is here");
              console.log(doc.data());
              authData.updateUserInfo(doc.data() as UserData);
            });
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
