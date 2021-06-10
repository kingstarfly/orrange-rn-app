import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Box, Button, Text } from "react-native-magnus";
import BottomNavBar from "components/BottomNavBar";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { RootStackParamList, ViewPlansTabParamList } from "types/types";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";
import { theme } from "constants/theme";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header2 } from "components/StyledText";
import { firestore } from "lib/firebase";

const ConfirmedViewPlans = ({
  navigation,
}: StackScreenProps<ViewPlansTabParamList, "Confirmed">) => {
  useEffect(() => {
    // todo DUMMY FUNCTION TO TEST FIRESTORE EMULATOR
    var docRef = firestore
      .collection("collection1")
      .doc("7jBaDDZxoVRQmORxK4Tz");
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return <MeetingCard meeting={item} accent />;
  };
  return (
    <Container>
      <SectionList
        style={styles.scrollViewContainer}
        sections={meetingsData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Header2 textTransform="uppercase" mt={30}>
            {title}
          </Header2>
        )}
      />
      {/* Scroll View of each month */}
      {/* Within each month, there are cards for each meeting */}

      <AddButton to="MeetupDetails" />
    </Container>
  );
};

export default ConfirmedViewPlans;
