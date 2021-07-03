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

  const [date, setDate] = useState(new Date(1598051730000));
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
      
      <Div row pb={divPadding}>
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" source={{uri: "https://picsum.photos/200"}}/>
        </TouchableOpacity>
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" source={{uri: "https://picsum.photos/200"}}/>
        </TouchableOpacity>
        <TouchableOpacity onLongPress={openModal}>
          <AvatarIcon radius={70} label="Chris" source={{uri: "https://picsum.photos/200"}}/>
        </TouchableOpacity>
      </Div>

      <Div row pb={divPadding}>
        <Text fontSize={fontSize}>When should we meet?</Text>
        <Icon name="calendar" fontSize={fontSize} color="black" pl={iconPadding}/>
      </Div>
      
      <Div pb={divPadding}>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      
        {/* <Input onFocus={showDatepicker} placeholder="Add a date!" w={windowWidth * 0.4} mr={iconPadding} fontSize={fontSize * 0.75} value={date.toString()}/>
        <Input onFocus={showTimepicker} placeholder="Start" w={windowWidth * 0.2} mr={iconPadding} fontSize={fontSize * 0.75}/>
        <Text mr={iconPadding}>-</Text>
        <Input onFocus={showTimepicker} placeholder="End" w={windowWidth * 0.2} fontSize={fontSize * 0.75}/> */}
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
