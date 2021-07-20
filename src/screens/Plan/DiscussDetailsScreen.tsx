import React, { useState, useRef } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import Container from "components/Container";
import {
  Subheading,
  CaptionText,
  BodyTextRegular,
  MiniText,
} from "components/StyledText";
import { RouteProp, useRoute } from "@react-navigation/core";
import {
  DiscussDetailsStackParamList,
  MeetupFields,
  ParticipantFields,
  PendingParticipantFields,
  PreferredDuration,
  SuggestionFields,
} from "types/types";
import { Div, Input, WINDOW_HEIGHT, WINDOW_WIDTH } from "react-native-magnus";
import AvatarIcon from "components/AvatarIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderComponent from "./Components/SectionHeaderComponent";
import { theme } from "constants/theme";
import DateTimeRowComponent from "../../components/DateTimeRowComponent";
import SuggestionRowComponent from "./Components/SuggestionRowComponent";
import { PhosphorIcon } from "constants/Icons";
import { SearchInput, UnderlinedInput } from "components/StyledInput";
import LargeButton from "components/LargeButton";
import {
  addCoOrganiser,
  addSuggestion,
  confirmMeetup,
  deleteMeetup,
  getMeetingInfo,
  getParticipants,
  getPendingParticipants,
  getPreferredDurations,
  getSingleParticipant,
  getSuggestions,
  leaveMeetup,
  toggleLike,
} from "lib/api/meetup";
import { useAuth } from "lib/auth";
import MeetupNameHeaderComponent from "./Components/MeetupNameHeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Loading from "components/Loading";
import { parseISO } from "date-fns";
import { sectionSpacing } from "constants/Layout";
import FinalDateTimeSelectionComponent from "./SelectTime/FinalDateTimeSelectionComponent";

const DiscussDetailsScreen = () => {
  const route =
    useRoute<RouteProp<DiscussDetailsStackParamList, "DiscussDetails">>();
  const { meetupId } = route.params;
  const navigation =
    useNavigation<
      StackNavigationProp<DiscussDetailsStackParamList, "DiscussDetails">
    >();
  const authData = useAuth();

  const [newSuggestion, setNewSuggestion] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<SuggestionFields[]>([]);

  const [meetingInfo, setMeetingInfo] = React.useState<MeetupFields>();
  const [participants, setParticipants] = React.useState<ParticipantFields[]>();
  const [pendingParticipants, setPendingParticipants] =
    React.useState<PendingParticipantFields[]>();
  const [preferredDurations, setPreferredDurations] =
    React.useState<PreferredDuration[]>();
  const [selectedParticipant, setSelectedParticipant] =
    React.useState<ParticipantFields>();

  const [currentParticipant, setCurrentParticipant] =
    React.useState<ParticipantFields>();
  const [finalStartTime, setFinalStartTime] = React.useState<Date>();
  const [finalEndTime, setFinalEndTime] = React.useState<Date>();
  const [activityInput, setActivityInput] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestionLoading, setSuggestionLoading] = React.useState(false);
  const [preferredDurationLoading, setPreferredDurationLoading] =
    React.useState(false);

  const windowWidth = useWindowDimensions().width;

  const CoOrgSheet = useRef(null);
  const OptionsSheet = useRef(null);

  const fetchSuggestions = React.useCallback(async () => {
    setSuggestionLoading(true);
    const suggestions = await getSuggestions(meetingInfo.id);
    setSuggestions(suggestions);
    setSuggestionLoading(false);
  }, [meetingInfo]);

  const fetchMeetupDetails = React.useCallback(async () => {
    setIsLoading(true);

    const a = await getMeetingInfo(meetupId);
    const b = await getParticipants(meetupId);
    const c = await getPendingParticipants(meetupId);

    setMeetingInfo(a);
    setParticipants(b);
    setPendingParticipants(c);

    a.startAt && setFinalStartTime(parseISO(a.startAt));
    a.endAt && setFinalEndTime(parseISO(a.endAt));
    a.activity && setActivityInput(a.activity);

    setIsLoading(false);
  }, [meetupId]);

  const fetchPreferredDurations = React.useCallback(async () => {
    setPreferredDurationLoading(true);
    const durations = await getPreferredDurations(
      meetupId,
      authData.userData.uid
    );

    setPreferredDurations(durations);
    setPreferredDurationLoading(false);
  }, [meetupId, authData.userData.uid]);

  // Need to fetch required data from firestore here, just by using meetupId
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchMeetupDetails();
    });

    return unsubscribe;
  }, [meetupId]);

  React.useEffect(() => {
    fetchSuggestions();
  }, [meetingInfo]);

  React.useEffect(() => {
    fetchPreferredDurations();
  }, [meetingInfo]);

  React.useEffect(() => {
    const part = participants?.find((p) => p.uid === authData?.userData?.uid);
    setCurrentParticipant(part);

    console.log(part);
  }, [participants, authData?.userData?.uid]);

  const handleSuggestionOnPress = async (suggestionId: string) => {
    // update front end so we can avoid refreshing page
    setSuggestions((prev) => {
      const suggestionIndex = prev.findIndex((s) => s.id === suggestionId);
      const suggestion = prev[suggestionIndex];
      const prevSuggestions = prev.slice(0, suggestionIndex);
      const afterSuggestions = prev.slice(suggestionIndex + 1);

      const index = suggestion.likedBy.findIndex(
        (uid) => uid === authData.userData.uid
      );
      if (index !== -1) {
        suggestion.likedBy.splice(index, 1);
      } else {
        suggestion.likedBy.push(authData.userData.uid);
      }
      return [...prevSuggestions, suggestion, ...afterSuggestions];
    });

    // call back end
    await toggleLike(meetingInfo.id, suggestionId, authData.userData.uid);
  };

  const handleAddSuggestion = async (content: string) => {
    if (!content) {
      return;
    }
    setNewSuggestion("");

    // call back end
    await addSuggestion(meetingInfo.id, authData.userData.uid, content);
    await fetchSuggestions();
  };

  const handlePressAddParticipant = () => {
    navigation.push("AddParticipants", {
      meetupId: meetingInfo.id,
      userUid: authData.userData.uid,
    });
  };

  const handlePressCalendar = () => {
    navigation.push("PickTime", {
      meetupId: meetingInfo.id,
    });
  };

  const handleOrgPress = async () => {
    await addCoOrganiser(selectedParticipant.uid, meetupId);
    await fetchMeetupDetails();
  };

  const handleDeleteForAll = async () => {
    Alert.alert(
      "",
      "Are you sure you want to delete this meet up for everyone? This is irreversible.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete for all",
          onPress: async () => {
            await deleteMeetup(meetupId);
            OptionsSheet.current.close();
            navigation.pop();
          },
        },
      ]
    );
  };

  const handleDeleteSelfAndLeave = async () => {
    Alert.alert("", "Are you sure you want to leave this meet up?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Leave",
        onPress: async () => {
          console.log("Leave clicked");
          try {
            await leaveMeetup(authData.userData.uid, meetupId);
          } catch (error) {
            Alert.alert("", error.message);
            return;
          }
          OptionsSheet.current.close();
          navigation.pop();
        },
      },
    ]);
  };

  const handleConfirmPress = async () => {
    Alert.alert(
      "",
      "Are you sure you want to mark this meetup as confirmed?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await confirmMeetup(
              meetupId,
              finalStartTime,
              finalEndTime,
              activityInput
            );

            navigation.pop();
            // await fetchAndSetData();
          },
        },
      ],
      { cancelable: true }
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => OptionsSheet.current.open()}>
          <Div>
            <PhosphorIcon
              name="dots-three"
              color={theme.colors.textdark}
              size={30}
            />
          </Div>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (isLoading || !meetingInfo) {
    return (
      <Container avoidHeader>
        <Loading />
      </Container>
    );
  }

  return (
    <Container avoidHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MeetupNameHeaderComponent title={meetingInfo.name} mb={24} />

        <Div mb={sectionSpacing}>
          <HeaderComponent
            title="🎊 Party-cipants"
            rightComponent={
              <TouchableOpacity onPress={() => handlePressAddParticipant()}>
                <PhosphorIcon
                  name="user-circle-plus"
                  color={theme.colors.textdark}
                  size={28}
                />
              </TouchableOpacity>
            }
          />
          <Div row mb={sectionSpacing}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                ...participants?.map((participant, index) => {
                  return (
                    <Pressable
                      key={index}
                      onLongPress={() => {
                        setSelectedParticipant(participant);
                        CoOrgSheet.current.open();
                      }}
                      style={{ marginRight: 16 }}
                    >
                      <AvatarIcon
                        diameter={60}
                        label={participant.username}
                        uri={participant.url_thumbnail}
                        withLabel
                        isHost={participant.isHost || participant.isCoOrganiser}
                        showBorder={!!participant.preferredDurations}
                      />
                    </Pressable>
                  );
                }),
                // ...pendingParticipants.map((pending, index2) => {
                //   return (
                //     <Pressable
                //       key={index2}
                //       onLongPress={() => CoOrgSheet.current.open()}
                //       style={{ marginRight: 16 }}
                //     >
                //       <AvatarIcon
                //         diameter={60}
                //         label={pending.username}
                //         uri={pending.url_thumbnail}
                //         withLabel
                //         blurred
                //       />
                //     </Pressable>
                //   );
                // }),
              ]}
            </ScrollView>
          </Div>
        </Div>

        <Div mb={sectionSpacing}>
          <HeaderComponent
            title="When are you free?"
            rightComponent={
              <TouchableOpacity onPress={() => handlePressCalendar()}>
                <PhosphorIcon
                  name="calendar"
                  color={theme.colors.textdark}
                  size={28}
                />
              </TouchableOpacity>
            }
          />
          {!preferredDurationLoading ? (
            preferredDurations ? (
              <Div>
                {preferredDurations?.map((preferredDuration, index) => {
                  return (
                    <DateTimeRowComponent
                      key={index}
                      start={parseISO(preferredDuration.startAt)}
                      end={parseISO(preferredDuration.endAt)}
                      readOnly
                    />
                  );
                })}
              </Div>
            ) : (
              <Div alignItems="center">
                <CaptionText>You have not entered a time</CaptionText>
              </Div>
            )
          ) : (
            <Loading />
          )}
        </Div>

        <Div mb={sectionSpacing}>
          <HeaderComponent title="What should we do?" />

          {!suggestionLoading ? (
            <Div>
              <ScrollView style={{ maxHeight: WINDOW_HEIGHT * 0.26 }}>
                {suggestions.map((suggestion, index) => (
                  <SuggestionRowComponent
                    key={index}
                    suggestion={suggestion}
                    onPress={async () =>
                      await handleSuggestionOnPress(suggestion.id)
                    }
                  />
                ))}
              </ScrollView>

              <Div row alignItems="center" justifyContent="space-between">
                <SearchInput
                  value={newSuggestion}
                  onChangeText={setNewSuggestion}
                  inputPlaceholder="Add a suggestion!"
                  w={windowWidth * 0.8}
                  maxLength={24}
                />

                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                  onPress={() => handleAddSuggestion(newSuggestion)}
                >
                  <PhosphorIcon
                    size={30}
                    name="plus-circle"
                    color={theme.colors.textdark}
                  />
                </TouchableOpacity>
              </Div>
            </Div>
          ) : (
            <Loading />
          )}
        </Div>

        {(currentParticipant?.isHost || currentParticipant?.isCoOrganiser) && (
          <Div
            mb={sectionSpacing}
            bg={theme.colors.backgroundlight}
            borderWidth={5}
            borderColor={theme.colors.primary300}
            px={12}
            pt={12}
            pb={20}
            rounded={10}
            style={{
              elevation: 4,
            }}
          >
            <HeaderComponent title="Lock it in!" />
            <Div row justifyContent="space-between" alignItems="center" mb={16}>
              <CaptionText w={70}>Activity:</CaptionText>
              <Div
                row
                flex={1}
                w={WINDOW_WIDTH * 0.5}
                h={35}
                rounded={5}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Input
                  value={activityInput}
                  onChangeText={setActivityInput}
                  placeholder="..."
                  py={0}
                  px={0}
                  pl={4}
                  w={windowWidth * 0.5}
                  h="100%"
                  maxLength={24}
                  fontSize={16}
                  fontFamily="inter-regular"
                  bg="transparent"
                  borderColor={theme.colors.linegray}
                  borderWidth={0}
                  borderBottomWidth={1}
                  rounded={0}
                />
              </Div>
            </Div>
            <FinalDateTimeSelectionComponent
              finalStartTime={finalStartTime}
              setFinalStartTime={setFinalStartTime}
              finalEndTime={finalEndTime}
              setFinalEndTime={setFinalEndTime}
            />
            <Div alignSelf="center" mt={40}>
              <LargeButton
                onPress={() => handleConfirmPress()}
                disabled={!finalStartTime || !finalEndTime}
                title="CONFIRM"
              />
            </Div>
          </Div>
        )}

        <RBSheet
          ref={CoOrgSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          height={WINDOW_HEIGHT * 0.075}
          customStyles={{
            container: {
              flexDirection: "column",
              justifyContent: "flex-start",
              borderRadius: 15,
              backgroundColor: theme.colors.backgroundlight,
            },
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleOrgPress()}
          >
            <Div
              flex={1}
              row
              w="100%"
              justifyContent="flex-start"
              alignItems="center"
              px={15}
            >
              <PhosphorIcon
                name="flag"
                color={theme.colors.textdark}
                size={24}
              />
              <CaptionText ml={15}>Make Co-Organiser</CaptionText>
            </Div>
          </TouchableOpacity>
        </RBSheet>

        <RBSheet
          ref={OptionsSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          height={WINDOW_HEIGHT * 0.15}
          customStyles={{
            container: {
              flexDirection: "column",
              justifyContent: "flex-start",
              borderRadius: 15,
              backgroundColor: theme.colors.backgroundlight,
            },
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleDeleteForAll()}
          >
            <Div
              flex={1}
              row
              w="100%"
              justifyContent="flex-start"
              alignItems="center"
              px={15}
            >
              <PhosphorIcon
                name="trash"
                color={theme.colors.textdark}
                size={24}
              />
              <CaptionText ml={15} color={theme.colors.red}>
                Delete for all
              </CaptionText>
            </Div>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleDeleteSelfAndLeave()}
          >
            <Div
              flex={1}
              row
              w="100%"
              justifyContent="flex-start"
              alignItems="center"
              px={15}
              bg={theme.colors.backgroundlight}
            >
              <PhosphorIcon
                name="sign-out"
                color={theme.colors.textdark}
                size={24}
              />
              <CaptionText ml={15}>Leave and delete for myself</CaptionText>
            </Div>
          </TouchableOpacity>
        </RBSheet>
      </ScrollView>
      <Div position="absolute" alignSelf="center" bottom={WINDOW_HEIGHT * 0.05}>
        {!currentParticipant?.isHost && !currentParticipant?.isCoOrganiser && (
          <CaptionText
            textAlign="center"
            children={`Waiting for ${meetingInfo.hostUsername} to confirm...`}
          />
        )}
      </Div>
    </Container>
  );
};

export default DiscussDetailsScreen;
