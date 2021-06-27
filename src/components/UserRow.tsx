import { SmallText, TinyItalicsText } from "components/StyledText";
import { theme } from "constants/theme";

import React from "react";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";

import AvatarIcon from "./AvatarIcon";

interface UserRowProps {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar_url?: string;
  // item: OtherUser; // todo add possible item combis in future. TootleUser | XXXDetials | YYYDetails
  // handleSelectUser: (item: TootleUser) => void;
  rightItem?: JSX.Element;
}
const UserRow = ({
  avatar_url,
  firstName,
  lastName,
  username,
  rightItem,
}: UserRowProps) => {
  return (
    <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
      <Box justifyContent="center" mr="lg">
        <AvatarIcon uri={avatar_url} label={firstName + " " + lastName} />
      </Box>

      <Box
        flex={1}
        flexDir="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <SmallText textAlign="left">{firstName + " " + lastName}</SmallText>
        <TinyItalicsText color={theme.colors.textgray400}>
          @{username}
        </TinyItalicsText>
      </Box>

      <Box justifyContent="center" alignItems="center">
        {rightItem}
      </Box>
    </Box>
  );
};

export default UserRow;
