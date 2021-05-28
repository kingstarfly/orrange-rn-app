import { BodyText } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { ContactDetails } from "./ContactList";

interface ContactItemProps {
  item: ContactDetails;
  handleSelectContact: (contact: ContactDetails) => void;
}

const ContactItem = ({ item, handleSelectContact }: ContactItemProps) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((str) => str[0])
      .join("");

    // return maximum first two only
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };
  return (
    <Box flexDir="row" my="sm" justifyContent="space-between">
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
        <Pressable onPress={() => handleSelectContact(item)}>
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
        </Pressable>
      </Box>
    </Box>
  );
};

export default ContactItem;
