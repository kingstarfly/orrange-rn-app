import { BodyText } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import { toggleSelectedState } from "screens/Create/MeetupDetails/AddFriends/AllFriendsSlice";
import { onSelectFriend } from "screens/Create/MeetupDetails/AddFriends/SelectedFriendsSlice";
import { ContactDetails } from "types/types";

interface ContactItemProps {
  item: ContactDetails;
  clearSearchQuery: () => void;
}

const ContactItem = ({ item, clearSearchQuery }: ContactItemProps) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((str) => str[0])
      .join("");

    // return maximum first two only
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };
  const dispatch = useAppDispatch();
  const handleSelectContact = (contact: ContactDetails) => {
    dispatch(toggleSelectedState(contact));
    dispatch(onSelectFriend(contact));
    clearSearchQuery();
  };
  return (
    <TouchableHighlight
      activeOpacity={0.85}
      underlayColor="#E5E5E5"
      onPress={() => handleSelectContact(item)}
      style={{ borderRadius: 8 }}
    >
      <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
        <Box justifyContent="center" mr="lg">
          <Avatar
            bg={theme.colors.primary400}
            size={40}
            color={theme.colors.textdark}
          >
            <BodyText>{getInitials(item.name)}</BodyText>
          </Avatar>
        </Box>

        <Box flex={1} justifyContent="center">
          <BodyText textAlign="left">{item.name}</BodyText>
        </Box>

        <Box justifyContent="center" alignItems="center">
          <Icon
            name={
              item.selected ? "check-circle" : "checkbox-blank-circle-outline"
            }
            color={
              item.selected ? theme.colors.primary500 : theme.colors.linegray
            }
            fontFamily="MaterialCommunityIcons"
            fontSize="4xl"
          />
        </Box>
      </Box>
    </TouchableHighlight>
  );
};

export default ContactItem;
