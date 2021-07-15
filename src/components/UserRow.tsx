import React from "react";
import { Avatar, Box, Button, Icon, Text } from "react-native-magnus";
import { CaptionText, TinyItalicsText } from "components/StyledText";
import { theme } from "constants/theme";

import AvatarIcon from "./AvatarIcon";

interface UserRowProps {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar_url?: string;
  rightItem?: JSX.Element;
}
const UserRow = ({
  avatar_url,
  firstName,
  lastName,
  username,
  rightItem,
}: UserRowProps) => {
  let fullName = firstName;
  if (lastName) {
    fullName = firstName + " " + lastName;
  }
  return (
    <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
      <Box justifyContent="center" mr="lg">
        <AvatarIcon uri={avatar_url} label={fullName} />
      </Box>

      <Box
        flex={1}
        flexDir="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <CaptionText textAlign="left">{fullName}</CaptionText>
        {username && (
          <TinyItalicsText color={theme.colors.textgray400}>
            @{username}
          </TinyItalicsText>
        )}
      </Box>

      <Box justifyContent="center" alignItems="center">
        {rightItem}
      </Box>
    </Box>
  );
};

export default UserRow;
