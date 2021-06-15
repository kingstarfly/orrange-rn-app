import React, { useEffect } from "react";
import Container from "components/Container";
import MeetingCard from "screens/ViewPlans/MeetingCard";
import { meetDataOne, meetingsData } from "constants/mockdata";
import { SectionList } from "react-native";
import { styles } from "./styles";
import AddButton from "components/AddButton";
import { firestore } from "lib/firebase";
import { Button } from "react-native-magnus";
import { useAuth } from "lib/auth";
import { Heading2 } from "components/StyledText";

const ConfirmedViewPlans = () => {
  const authData = useAuth();

  // useEffect(() => {
  //   // todo DUMMY FUNCTION TO TEST FIRESTORE EMULATOR
  //   var docRef = firestore
  //     .collection("collection1")
  //     .doc("7jBaDDZxoVRQmORxK4Tz");
  //   docRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

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
          <Heading2 textTransform="uppercase" mt={20}>
            {title}
          </Heading2>
        )}
      />

      {/* <Button onPress={() => authData.signOut()}>Sign out</Button> */}
    </Container>
  );
};

export default ConfirmedViewPlans;
