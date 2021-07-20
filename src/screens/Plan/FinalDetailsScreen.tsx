import React from "react";
import Container from "components/Container";
import { Div, Overlay, WINDOW_HEIGHT } from "react-native-magnus";
import {
  AppStackParamList,
  MeetupFields,
  ParticipantFields,
  PendingParticipantFields,
} from "types/types";
import { RouteProp, useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "lib/auth";
import MeetupNameHeaderComponent from "./Components/MeetupNameHeaderComponent";
import HeaderComponent from "./Components/SectionHeaderComponent";
import {
  ScrollView,
  Platform,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import AvatarIcon from "components/AvatarIcon";
import {
  deleteMeetup,
  editMeetup,
  getMeetingInfo,
  getParticipants,
  getPendingParticipants,
  leaveMeetup,
} from "lib/api/meetup";
import Loading from "components/Loading";
import LargeButton from "components/LargeButton";
import { format, parseISO } from "date-fns";
import HighlightedText from "./Components/HighlightedText";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import { BodyTextRegular, CaptionText, MiniText } from "components/StyledText";
import { theme } from "constants/theme";
import SmallButton from "components/SmallButton";
import { sectionSpacing } from "constants/Layout";
import { PhosphorIcon } from "constants/Icons";
import RBSheet from "react-native-raw-bottom-sheet";

const FinalDetailsScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, "FinalDetails">>();
  const { meetupId } = route.params;

  const navigation =
    useNavigation<StackNavigationProp<AppStackParamList, "FinalDetails">>();
  const authData = useAuth();

  const [meetingInfo, setMeetingInfo] = React.useState<MeetupFields>();
  const [participants, setParticipants] = React.useState<ParticipantFields[]>();
  const [pendingParticipants, setPendingParticipants] =
    React.useState<PendingParticipantFields[]>();

  const [isLoading, setIsLoading] = React.useState(false);
  // const [modalVisible, setModalVisible] = React.useState(false);

  const OptionsSheet = React.useRef(null);

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

  // Need to fetch required data from firestore here, just by using meetupId
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchMeetupDetails();
    });

    return unsubscribe;
  }, [meetupId]);

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

  const handleEdit = async () => {
    Alert.alert(
      "",
      "Are you sure you want to mark this meet up as in-progress?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: async () => {
            await editMeetup(meetupId);
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
          },
        },
      ]
    );
  };

  const handleCreateEvent = async () => {
    // 1. Check existing calendars for any "Orrange" calendar.
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    let calId: string;

    for (let cal of calendars) {
      if (cal.name === "Orrange") {
        calId = cal.id;
        break;
      }
    }

    // 2. If not, create it.
    if (!calId) {
      calId = await createOrrangeCalendar();
    }

    // 3. Take the calendar ID, and create an event into it.
    let eventId = await Calendar.createEventAsync(calId, {
      title: meetingInfo.name,
      startDate: parseISO(meetingInfo.startAt),
      endDate: parseISO(meetingInfo.endAt),
      notes: meetingInfo.activity,
      timeZone: Localization.timezone,
    });

    Alert.alert("", "This meetup has been saved onto your calendar!");
    // setModalVisible(true);
  };

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "Default"
    );
    return defaultCalendars[0].source;
  }

  async function createOrrangeCalendar() {
    const defaultCalendarSource: Calendar.Source =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : {
            isLocalAccount: true,
            name: "Orrange",
            type: "com.google",
          }; // using username as name of source of calendar
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Orrange",
      color: "orange",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "Orrange",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    return newCalendarID;
  }

  if (isLoading || !meetingInfo) {
    return (
      <Container avoidHeader>
        <Loading />
      </Container>
    );
  }

  let start_datetime = parseISO(meetingInfo.startAt);
  let end_datetime = parseISO(meetingInfo.endAt);

  // obtain the date of meeting 21st Feb 2021
  let start_date_string = format(start_datetime, "do MMMM yyyy");
  let start_day_string = format(start_datetime, "EEEE");
  let start_time_string = format(start_datetime, "h:mm a");

  let end_date_string = format(end_datetime, "do MMMM yyyy");
  let end_day_string = format(end_datetime, "EEEE");
  let end_time_string = format(end_datetime, "h:mm a");

  let activityContent = meetingInfo.activity;

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

  return (
    <Container avoidHeader>
      <MeetupNameHeaderComponent title={meetingInfo.name} mb={24} />

      <Div mb={sectionSpacing}>
        <HeaderComponent title="🎊 Party-cipants" />
        <Div row mb={sectionSpacing}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              ...participants.map((participant, index) => {
                return (
                  <Div mr={16} key={index}>
                    <AvatarIcon
                      diameter={60}
                      label={participant.username}
                      uri={participant.url_thumbnail}
                      withLabel
                      isHost={participant.isHost}
                      showBorder={!!participant.preferredDurations}
                    />
                  </Div>
                );
              }),
              // ...pendingParticipants.map((pending, index2) => {
              //   return (
              //     <Div mr={16} key={index2}>
              //       <AvatarIcon
              //         diameter={60}
              //         label={pending.username}
              //         uri={pending.url_thumbnail}
              //         withLabel
              //         blurred
              //       />
              //     </Div>
              //   );
              // }),
            ]}
          </ScrollView>
        </Div>

        <Div mb={sectionSpacing}>
          <HeaderComponent title="Start" />
          <HighlightedText>
            {start_date_string}, {end_day_string}
          </HighlightedText>
          <HighlightedText>{end_time_string}</HighlightedText>
        </Div>

        <Div mb={sectionSpacing}>
          <HeaderComponent title="End" />
          <HighlightedText>
            {end_date_string}, {start_day_string}
          </HighlightedText>
          <HighlightedText>{start_time_string}</HighlightedText>
        </Div>

        <Div mb={sectionSpacing}>
          <HeaderComponent title="Activity" />
          <HighlightedText>{activityContent}</HighlightedText>
        </Div>
      </Div>
      <Div position="absolute" alignSelf="center" bottom={0.05 * WINDOW_HEIGHT}>
        <LargeButton
          onPress={() => {
            handleCreateEvent();
          }}
          title="ADD TO CALENDAR"
        />
      </Div>

      {/* <Overlay
        justifyContent="center"
        alignItems="center"
        transparent={true}
        visible={modalVisible}
        bg={theme.colors.backgroundlight}
        overlayColor="black"
        overlayOpacity={0.65}
      >
        <Div m={20} alignItems="center">
          <BodyTextRegular textAlign="center" mb={40}>
            Event creation success!
          </BodyTextRegular>

          <SmallButton
            colorTheme="primary"
            onPress={() => {
              setModalVisible(false);
            }}
          >
            Done
          </SmallButton>
        </Div>
      </Overlay> */}

      <RBSheet
        ref={OptionsSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={WINDOW_HEIGHT * 0.225}
        customStyles={{
          container: {
            flexDirection: "column",
            justifyContent: "flex-start",
            borderRadius: 15,
            backgroundColor: theme.colors.backgroundlight,
          },
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => handleEdit()}>
          <Div
            flex={1}
            row
            w="100%"
            justifyContent="flex-start"
            alignItems="center"
            px={15}
          >
            <PhosphorIcon
              name="note-pencil"
              color={theme.colors.textdark}
              size={24}
            />
            <CaptionText ml={15}>Edit plan</CaptionText>
          </Div>
        </TouchableOpacity>
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
    </Container>
  );
};

export default FinalDetailsScreen;
