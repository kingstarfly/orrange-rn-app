import { BodyText } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { ContactDetails } from "./ContactList";

interface ContactItemProps {
  name: string;
  handleSelectContact: (contact: ContactDetails) => void;
  isSelected: boolean;
}

const ContactItem = ({
  name,
  handleSelectContact,
  isSelected,
}: ContactItemProps) => {
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
        <Avatar bg={theme.colors.primary400} size={40} color="red800">
          {getInitials(name)}
        </Avatar>
      </Box>

      <Box flex={1} justifyContent="center">
        <BodyText textAlign="left">{name}</BodyText>
      </Box>

      <Box justifyContent="center" alignItems="center">
        <Pressable onPress={() => console.log("tick pressed")}>
          <Icon
            name={isSelected ? "check-circle" : "checkbox-blank-circle-outline"}
            color={theme.colors.primary500}
            fontFamily="MaterialCommunityIcons"
            fontSize="4xl"
          />
        </Pressable>
      </Box>
    </Box>
  );
};

export default ContactItem;
