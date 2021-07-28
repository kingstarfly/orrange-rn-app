import React, { useState } from "react";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Box, WINDOW_HEIGHT } from "react-native-magnus";
import {
  AppStackParamList,
  CreateMeetupStackParamList,
  OtherUser,
} from "types/types";
import Container from "components/Container";
import { theme } from "constants/theme";
import StyledButton from "components/StyledButton";
import { Heading, Subheading } from "components/StyledText";
import { useWindowDimensions, Alert } from "react-native";
import { UnderlinedInput } from "components/StyledInput";
import PalsListSelect from "./PalsListSelect";
import LargeButton from "components/LargeButton";
import { getPals } from "lib/api/pals";
import { useAuth } from "lib/auth";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { createMeetup } from "lib/api/meetup";
import { clearSelectedPals } from "redux/slices/SelectedPalsSlice";

const MeetupDetails = () => {
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");
  const [pals, setPals] = React.useState<OtherUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const authData = useAuth();
  const selectedPals = useAppSelector(
    (state) => state.SelectedPals.selectedPals
  );
  const dispatch = useAppDispatch();

  // Workaround for typescript error?
  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, "MainBottomTabNavigator">
    >();

  const handleConfirm = async () => {
    if (name.length < 4) {
      Alert.alert(
        "",
        "Plan name should be longer than 4 characters!",
        [
          {
            text: "Done",
          },
        ],
        { cancelable: true }
      );
      return;
    }
    // use all information, and create new meetup in firestore
    const meetupId = await createMeetup(name, selectedPals, authData.userData);

    // Clear redux information of selected pals
    dispatch(clearSelectedPals());

    // Replace navigation history, (home page --> Discuss details)
    navigation.reset({
      index: 1,
      routes: [
        { name: "MainBottomTabNavigator" },
        {
          name: "DiscussDetailsStackNavigator",
          state: {
            routes: [
              {
                name: "DiscussDetails",
                params: {
                  meetupId: meetupId,
                },
              },
            ],
          },
        },
      ],
    });
  };

  const getAllPals = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const initialPals = await getPals(authData.userData.uid);
      const res = initialPals.map((contact) => ({
        ...contact,
        selected: false,
      }));
      res.sort((a, b) => a.username.localeCompare(b.username));
      setPals(res);
    } catch (error) {
      console.error("Unable to fetch pals", error);
    }
    setIsLoading(false);
  }, []);

  // Set up a listener on screen mount
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await getAllPals();
    });

    return unsubscribe;
  }, []);

  return (
    <Container>
      <Box px={16} justifyContent="space-between" flex={1}>
        <Box py="2xl">
          <Heading>Create New Plan</Heading>
        </Box>
        <Box flex={1}>
          <UnderlinedInput
            px={0}
            py="sm"
            placeholder="Name Your Meetup!"
            value={name}
            onChangeText={setName}
            maxLength={28}
          />
        </Box>

        <Box flex={5} mb={height * 0.1}>
          <Subheading>Add your pals!</Subheading>
          <PalsListSelect pals={pals} setPals={setPals} isLoading={isLoading} />
        </Box>
      </Box>

      <Box bottom={WINDOW_HEIGHT * 0.02} position="absolute" alignSelf="center">
        <LargeButton onPress={handleConfirm} title="CREATE" />
      </Box>
    </Container>
  );
};

export default MeetupDetails;
