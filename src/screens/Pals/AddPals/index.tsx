import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import Container from "components/Container";
import SearchableList from "components/SearchableList";
import SmallButton from "components/SmallButton";
import UserRow from "components/UserRow";
import { getAllNonPals, getSentPalRequests, requestAddPal } from "lib/api/pals";
import { useAuth } from "lib/auth";
import React, { useEffect, useState } from "react";
import { OtherUser, PalsStackParamList, UserData } from "types/types";

const AddPals = () => {
  const [nonPals, setNonPals] = useState<OtherUser[]>([]);
  const [sentRequests, setSentRequests] = useState<OtherUser[]>([]);

  const [isListLoading, setIsListLoading] = useState(false);
  const authData = useAuth();
  const navigation =
    useNavigation<StackNavigationProp<PalsStackParamList, "AddPals">>();

  // retrieve all users from database, also include current friends. To display "friends" indicator.
  const fetchAllNonPalsAndPendingRequests = async () => {
    const nonPalUsers = await getAllNonPals(authData.userData.uid);
    const pending = await getSentPalRequests(authData.userData.uid);
    setNonPals(nonPalUsers);
    setSentRequests(pending);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsListLoading(true);
      fetchAllNonPalsAndPendingRequests().finally(() => {
        setIsListLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  const handleAddButtonClick = async (
    currentUser: UserData,
    targetUser: OtherUser
  ) => {
    await requestAddPal(currentUser, targetUser);
    setSentRequests((prev) => [...prev, targetUser]); // quick client side update
  };

  const renderItem = ({ item: otherUser }: { item: OtherUser }) => {
    let rightComponent = (
      <SmallButton
        onPress={() => handleAddButtonClick(authData.userData, otherUser)}
        colorTheme="primary"
      >
        Add
      </SmallButton>
    );

    if (sentRequests?.find((sentReq) => sentReq.uid === otherUser.uid)) {
      rightComponent = (
        <SmallButton
          onPress={() => console.log("Accepted")}
          disabled
          colorTheme="plain"
        >
          Sent
        </SmallButton>
      );
    }

    return (
      <UserRow
        avatar_url={otherUser.url_thumbnail}
        firstName={otherUser.firstName}
        lastName={otherUser.lastName}
        username={otherUser.username}
        rightItem={rightComponent}
      />
    );
  };

  return (
    <Container avoidHeader>
      <SearchableList
        data={nonPals}
        inputPlaceholder="Search..."
        isLoading={isListLoading}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default AddPals;
