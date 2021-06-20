import { BodyMainText } from "components/StyledText";
import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { NonTootleUser, TootleUser } from "types/types";

interface UserRowProps {
  item: TootleUser | NonTootleUser; // todo add possible item combis in future. TootleUser | XXXDetials | YYYDetails
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
            <BodyMainText>{getInitials(item.name)}</BodyMainText>
          </Avatar>
        )}
      </Box>

      <Box flex={1} justifyContent="center">
        <BodyMainText textAlign="left">{item.name}</BodyMainText>
      </Box>

      <Box justifyContent="center" alignItems="center">
        {rightIcon}
      </Box>
    </Box>
  );
};

export default UserRow;
