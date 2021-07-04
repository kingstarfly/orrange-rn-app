import React, { useState, useRef } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import Container from "components/Container";
import {
  Subheading,
  SmallText,
  BodyTextRegular,
  CaptionText,
  MiniText,
  Heading,
} from "components/StyledText";
import { RouteProp, useRoute } from "@react-navigation/core";
import { AppStackParamList } from "types/types";
import {
  Text,
  Div,
  Button,
  Icon,
  Input,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from "react-native-magnus";
import AvatarIcon from "components/AvatarIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import { format } from "date-fns";
import HeaderComponent from "./Components/HeaderComponent";
import { theme } from "constants/theme";
import DateTimeRowComponent from "./Components/DateTimeRowComponent";
import HeartCountComponent from "./Components/HeartCountComponent";
import SuggestionRowComponent from "./Components/SuggestionRowComponent";
import { PhosphorIcon } from "constants/Icons";
import { SearchInput, UnderlinedInput } from "components/StyledInput";
import LargeButton from "components/LargeButton";
import { View } from "react-native";

const DiscussDetailsScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, "DiscussDetails">>();
  const { meetingInfo, participants, pendingParticipants } = route.params;

  const [suggestion, setSuggestion] = React.useState("");

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const fontSize = 30;
  const iconPadding = 10;
  var heartColour = "#F78826";
  const divPadding = 20;

  const refRBSheet = useRef(null);

  const openModal = () => {
    refRBSheet.current.open();
  };

  return (
    <Container avoidHeader>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={windowHeight * 0.15}
        // customStyles={{
        //   wrapper: {
        //     backgroundColor: "transparent",
        //   },
        //   draggableIcon: {
        //     backgroundColor: "#000",
        //   },
        // }}
      >
        <TouchableOpacity>
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
        <TouchableOpacity style={{ flex: 1 }}>
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

      <Div mb={divPadding}>
        <HeaderComponent
          title="🎊 Party-cipants"
          rightComponent={
            <CaptionText onPress={() => console.log("Pressed")}>
              Add Pals
            </CaptionText>
          }
        />
        <Div row mb={divPadding}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {participants.map((participant, index) => {
              return (
                <Pressable
                  key={index}
                  onLongPress={openModal}
                  style={{ marginRight: 8 }}
                >
                  <AvatarIcon
                    diameter={45}
                    label={participant.username}
                    uri={participant.url_thumbnail}
                    withLabel
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </Div>
      </Div>

      {/* <MiniText>{JSON.stringify(participants, null, 2)}</MiniText> */}

      <Div mb={divPadding}>
        <HeaderComponent
          title="My timings"
          rightComponent={
            <Pressable onPress={() => console.log("on edit handle")}>
              <CaptionText>Edit</CaptionText>
            </Pressable>
          }
        />
        <Div>
          {/* 
// TODO: map this component for each timing currently
*/}
          <DateTimeRowComponent start={new Date()} end={new Date()} />
        </Div>
      </Div>

      <Div mb={divPadding}>
        <HeaderComponent title="What should we do?" />
        <Div>
          <SuggestionRowComponent title="I'm kim?" />

          <Div row alignItems="center" justifyContent="space-between">
            <SearchInput
              value={suggestion}
              onChangeText={setSuggestion}
              inputPlaceholder="Add a suggestion!"
              w={windowWidth * 0.7}
            />

            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <PhosphorIcon
                size={30}
                name="plus-circle"
                color={theme.colors.textdark}
              />
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>

      <Div position="absolute" bottom={WINDOW_HEIGHT * 0.05} alignSelf="center">
        <LargeButton
          onPress={() => {
            console.log("Confirmed");
          }}
          title="CONFIRM"
        />
      </Div>
    </Container>
  );
};

export default DiscussDetailsScreen;
