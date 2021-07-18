import React, { useState, useRef } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Container from "components/Container";
import {
  Subheading,
  CaptionText,
  BodyTextRegular,
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
import { Div, WINDOW_HEIGHT } from "react-native-magnus";
import AvatarIcon from "components/AvatarIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderComponent from "./Components/SectionHeaderComponent";
import { theme } from "constants/theme";
import DateTimeRowComponent from "../../components/DateTimeRowComponent";
import SuggestionRowComponent from "./Components/SuggestionRowComponent";
import { PhosphorIcon } from "constants/Icons";
import { SearchInput } from "components/StyledInput";
import LargeButton from "components/LargeButton";
import {
  addCoOrganiser,
  addSuggestion,
  getMeetingInfo,
  getParticipants,
  getPendingParticipants,
  getPreferredDurations,
  getSingleParticipant,
  getSuggestions,
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

  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestionLoading, setSuggestionLoading] = React.useState(false);
  const [preferredDurationLoading, setPreferredDurationLoading] =
    React.useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const refRBSheet = useRef(null);

  const openModal = () => {
    refRBSheet.current.open();
  };

  const closeModal = () => {
    refRBSheet.current.close();
  };

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
    console.log("Finding current participant..");
    console.log(participants);
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
    console.log("Handling org press");
    await addCoOrganiser(selectedParticipant.uid, meetupId);
    await fetchMeetupDetails();
  };

  if (isLoading || !meetingInfo) {
    return (
      <Container avoidHeader>
        <Loading />
      </Container>
    );
  }
  return (
    <Container avoidHeader>
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
                      openModal();
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
              ...pendingParticipants.map((pending, index2) => {
                return (
                  <Pressable
                    key={index2}
                    onLongPress={openModal}
                    style={{ marginRight: 16 }}
                  >
                    <AvatarIcon
                      diameter={60}
                      label={pending.username}
                      uri={pending.url_thumbnail}
                      withLabel
                      blurred
                    />
                  </Pressable>
                );
              }),
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
                w={windowWidth * 0.7}
                maxLength={24}
              />

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
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
        <Div mb={sectionSpacing}>
          <HeaderComponent title="When should we meet?" />
          <FinalDateTimeSelectionComponent />
        </Div>
      )}

      <Div position="absolute" bottom={WINDOW_HEIGHT * 0.05} alignSelf="center">
        {meetingInfo.creatorId === authData.userData.uid ? (
          <LargeButton
            onPress={() => {
              console.log("Confirmed");
            }}
            title="CONFIRM"
          />
        ) : (
          <CaptionText
            textAlign="center"
            children={`Waiting for ${meetingInfo.creatorUsername} to confirm...`}
          />
        )}
      </Div>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={windowHeight * 0.15}
      >
        <TouchableOpacity onPress={() => handleOrgPress()}>
          <Div
            row
            w="100%"
            justifyContent="center"
            alignItems="center"
            py={16}
            bg={theme.colors.primary500}
          >
            <Subheading>Make Co-Organiser</Subheading>
          </Div>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => closeModal()}>
          <Div
            row
            w="100%"
            justifyContent="center"
            alignItems="center"
            py={16}
            bg={theme.colors.backgroundlight}
          >
            <Subheading>Cancel</Subheading>
          </Div>
        </TouchableOpacity>
      </RBSheet>
    </Container>
  );
};

export default DiscussDetailsScreen;
