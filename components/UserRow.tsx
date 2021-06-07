import { BodyText } from "components/StyledText";
import { theme } from "constants/theme";
import React from "react";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { AddPalContactDetails, TootleUser } from "types/types";

interface UserRowProps {
  item: TootleUser | AddPalContactDetails; // todo add possible item combis in future. TootleUser | XXXDetials | YYYDetails
  // handleSelectUser: (item: TootleUser) => void;
  rightIcon?: JSX.Element;
}
/**
 * Common Component for rendering rows of user
 *
 * @param item - Information required for rendering the user
 * @param rightIcon - Component to display at the right section of the row
 *
 *
 */
const UserRow = ({ item, rightIcon }: UserRowProps) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((str) => str[0])
      .join("");

    // return maximum first two only
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };

  return (
    <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
      <Box justifyContent="center" mr="lg">
        {item.thumbnail === "undefined" ? (
          <Avatar
            source={{ uri: item.thumbnail }}
            bg={theme.colors.primary400}
            size={40}
            color={theme.colors.textdark}
          />
        ) : (
          <Avatar
            bg={theme.colors.primary400}
            size={40}
            color={theme.colors.textdark}
          >
            <BodyText>{getInitials(item.name)}</BodyText>
          </Avatar>
        )}
      </Box>

      <Box flex={1} justifyContent="center">
        <BodyText textAlign="left">{item.name}</BodyText>
      </Box>

      <Box justifyContent="center" alignItems="center">
        {rightIcon}
      </Box>
    </Box>
  );
};

export default UserRow;
