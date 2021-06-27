import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Container";
import SearchableList from "components/SearchableList";
import SmallButton from "components/SmallButton";
import { MediumText } from "components/StyledText";
import UserRow from "components/UserRow";
import { DUMMY_USER_ID } from "constants/mockdata";
import { theme } from "constants/theme";
import { getPalRequests, getPals } from "lib/api/pals";
import { getMockUsers } from "mockapi";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "react-native-magnus";
import {
  MainBottomTabParamList,
  OtherUser,
  PalFields,
  PalRequestFields,
  TootleUser,
  UserData,
} from "types/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ViewPals = () => {
  const [pals, setPals] = useState<PalFields[]>([]);
  const [palRequests, setPalRequests] = useState<PalRequestFields[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<MainBottomTabParamList, "Pals">>();

  useEffect(() => {
    const fetchPalsAndPalRequests = async () => {
      setIsLoading(true);
      const pals = await getPals(DUMMY_USER_ID);
      const palRequests = await getPalRequests(DUMMY_USER_ID);
      console.log(pals);
      console.log(palRequests);

      setPals(pals);
      setPalRequests(palRequests);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPalsAndPalRequests();
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item, index }: { item: OtherUser; index: number }) => {
    let rightItem =
      index < palRequests.length ? (
        <Box row justifyContent="flex-end" alignItems="center">
          <SmallButton
            onPress={() => console.log("Accepted")}
            loading={false}
            colorTheme="primary"
            mr={8}
          >
            Accept
          </SmallButton>
          <SmallButton
            onPress={() => console.log("Deleted")}
            loading={false}
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
        <TouchableOpacity onPress={() => console.log("to add pals")}>
          <MediumText color={theme.colors.primary700}>Add a Pal</MediumText>
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
