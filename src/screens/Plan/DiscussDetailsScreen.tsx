import React, { useState, useRef } from "react";
import { useWindowDimensions, TouchableOpacity, Platform } from "react-native";
import Container from "components/Container";
import { Subheading, SmallText } from "components/StyledText";
import { RouteProp, useRoute } from "@react-navigation/core";
import { AppStackParamList } from "types/types";
import { Text, Div, Button, Icon, Input } from "react-native-magnus"
import AvatarIcon from "components/AvatarIcon";
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from "react-native-raw-bottom-sheet";

const DiscussDetailsScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, "DiscussDetails">>();
  const { meetingInfo, participants, pendingParticipants } = route.params;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const fontSize = 30;
  const iconPadding = 10;
  var heartColour = "#F78826";
  const divPadding = 20;
  

  const refRBSheet = useRef();

  const openModal = () => {
    refRBSheet.current.open()
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };




  return (
    <Container avoidHeader>
      
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={windowHeight * 0.15}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <Div row justifyContent="center" alignItems="center">
          <Button  bg="lightgrey" my={iconPadding} >
            <Text fontSize={fontSize}>Make Co-Organiser</Text>
          </Button>
        </Div>
      </RBSheet>
      
      <Div row pb={divPadding}>
        <Text fontSize={fontSize}>Party-cipants🎊</Text>
        <TouchableOpacity>
          <Icon name="pluscircleo" fontSize={fontSize} color="black" pl={iconPadding}/>
        </TouchableOpacity>
      </Div>
      
      <Div row pb={divPadding} justifyContent="space-evenly">
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" uri="https://picsum.photos/200"/>
        </TouchableOpacity>
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" uri= "https://picsum.photos/200"/>
        </TouchableOpacity>
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" uri="https://picsum.photos/200"/>
        </TouchableOpacity>
      </Div>

      <Div row pb={divPadding}>
        <Text fontSize={fontSize}>When should we meet?</Text>
        <Icon name="calendar" fontSize={fontSize} color="black" pl={iconPadding}/>
      </Div>
      
      <Div row justifyContent="space-between" pb={divPadding}>
        <Div flex={1.3}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </Div>

        <Div flex={0.8}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </Div>

        <Div row alignItems="center" flex={0.4}>
          <Text textAlign="center" fontSize={fontSize * 0.75} px={iconPadding}> to</Text>
        </Div>

        <Div flex={1}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </Div>
      </Div>

      <Div row alignItems="center" pb={divPadding}>
        <Text fontSize={fontSize}>Now what should we do...</Text>
        <TouchableOpacity>
        <Icon name="dice-4-outline" fontFamily="MaterialCommunityIcons" fontSize={fontSize+5} color="black" pl={iconPadding}/>
        </TouchableOpacity>
      </Div>

      <Div row mb={divPadding}>
          <Text fontSize={fontSize} color={heartColour}>12</Text>
          <TouchableOpacity>
            <Icon name="heart" fontSize={fontSize} color={heartColour} px={iconPadding}/>
          </TouchableOpacity>
          <Text fontSize={fontSize} bg="#FBC99D" rounded={10} px={iconPadding}>I'm kim?</Text>
      </Div>

      <Div row alignItems="center">
        <TouchableOpacity>
          <Icon name="pluscircleo" color="black" fontSize={fontSize} px={iconPadding}/>
        </TouchableOpacity>
        <Input placeholder="Add a suggestion!" w={windowWidth * 0.7} fontSize={fontSize * 0.75} />
      </Div>

      <Div mt="auto" mb={divPadding} >
        <Button bg="#F47D15" rounded="circle" w={windowWidth * 0.9} h={windowHeight * 0.07}>
          <Text fontSize={fontSize} color="white">CONFIRM</Text>
        </Button>
      </Div>
    </Container>
  );
};

export default DiscussDetailsScreen;
