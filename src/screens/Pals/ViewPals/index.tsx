import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Container";
import SearchableList from "components/SearchableList";
import SmallButton from "components/SmallButton";
import { BodyTextRegular } from "components/StyledText";
import UserRow from "components/UserRow";
import { DUMMY_USER_ID } from "constants/mockdata";
import { theme } from "constants/theme";
import {
  acceptPalRequest,
  deletePalRequest,
  getPalRequests,
  getPals,
} from "lib/api/pals";

import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "react-native-magnus";
import {
  OtherUser,
  PalFields,
  PalRequestFields,
  PalsStackParamList,
  UserData,
} from "types/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "lib/auth";

const ViewPals = () => {
  const [pals, setPals] = useState<PalFields[]>([]);
  const [palRequests, setPalRequests] = useState<PalRequestFields[]>([]);

  const authData = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<StackNavigationProp<PalsStackParamList, "ViewPals">>();

  const fetchPalsAndPalRequests = async () => {
    const pals = await getPals(DUMMY_USER_ID);
    const palRequests = await getPalRequests(DUMMY_USER_ID);

    setPals(pals);
    setPalRequests(palRequests);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("setting loading true");
      setIsLoading(true);
      fetchPalsAndPalRequests().finally(() => {
        setIsLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  const handleAcceptPress = async (
    currentUser: UserData,
    requester: OtherUser
  ) => {
    console.log("Accepted");
    try {
      await acceptPalRequest(currentUser, requester);
      setPalRequests((prev) => prev.filter((req) => req.uid !== requester.uid));
      setPals((prev) => [{ ...requester, addedAt: null }, ...prev]);
    } catch (error) {
      alert(error);
    }
  };

  const handleDeletePress = async (
    currentUser: UserData,
    requester: OtherUser
  ) => {
    console.log("Deleted");
    try {
      await deletePalRequest(currentUser, requester);
      setPalRequests((prev) => prev.filter((req) => req.uid !== requester.uid));
    } catch (error) {
      alert(error);
    }
  };

  const renderItem = ({ item, index }: { item: OtherUser; index: number }) => {
    let rightItem =
      index < palRequests.length ? (
        <Box row justifyContent="flex-end" alignItems="center">
          <SmallButton
            onPress={() => handleAcceptPress(authData.userData, item)}
            colorTheme="primary"
            mr={8}
          >
            Accept
          </SmallButton>
          <SmallButton
            onPress={() => handleDeletePress(authData.userData, item)}
            colorTheme="plain"
          >
            Delete
          </SmallButton>
        </Box>
      ) : null;

    return (
      <UserRow
        firstName={item.firstName}
        lastName={item.lastName}
        username={item.username}
        avatar_url={item.url_thumbnail}
        rightItem={rightItem}
      />
    );
  };

  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <Container>
      <Box row alignSelf="flex-end" my={20}>
        <TouchableOpacity onPress={() => navigation.navigate("AddPals")}>
          <BodyTextRegular color={theme.colors.primary700}>
            Add a Pal
          </BodyTextRegular>
        </TouchableOpacity>

        {/* <PhosphorIcon
          name="user-plus"
          color={theme.colors.textdark}
          size={16}
        /> */}
      </Box>
      <Box mb={bottomTabBarHeight}>
        <SearchableList<OtherUser>
          data={[...palRequests, ...pals]}
          inputPlaceholder="Search for Pals"
          isLoading={isLoading}
          renderItem={renderItem}
        />
      </Box>
    </Container>
  );
};

export default ViewPals;
