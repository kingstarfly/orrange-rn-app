import { BodyMainText, SmallText } from "components/StyledText";
import { theme } from "constants/theme";
import { getInitials } from "lib/helpers";
import React from "react";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import {
  NonTootleUser,
  OtherUser,
  PalFields,
  PalRequestFields,
  TootleUser,
} from "types/types";
import AvatarIcon from "./AvatarIcon";

interface UserRowProps {
  item: OtherUser; // todo add possible item combis in future. TootleUser | XXXDetials | YYYDetails
  // handleSelectUser: (item: TootleUser) => void;
  rightItem?: JSX.Element;
}
/**
 * Common Component for rendering rows of user
 *
 * @param item - Information required for rendering the user
 * @param rightItem - Component to display at the right section of the row
 *
 *
 */
const UserRow = ({ item, rightItem }: UserRowProps) => {
  return (
    <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
      <Box justifyContent="center" mr="lg">
        <AvatarIcon
          uri={item.url_thumbnail}
          label={item.firstName + item.lastName}
        />
      </Box>

      <Box flex={1} justifyContent="center">
        <SmallText textAlign="left">
          {item.firstName + " " + item.lastName}
        </SmallText>
      </Box>

      <Box justifyContent="center" alignItems="center">
        {rightItem}
      </Box>
    </Box>
  );
};

export default UserRow;
