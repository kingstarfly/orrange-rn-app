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

interface UserRowProps {
  item: ContactDetails; // todo add possible item combis in future. ContactDetails | XXXDetials | YYYDetails
  handleSelectUser: (item: ContactDetails) => void;
  selectedIcon: JSX.Element;
  unselectedIcon: JSX.Element;
}
/**
 * Common Component for rendering rows of user
 *
 * @param item - Information required for rendering the user
 * @param handleSelectUser - Callback to call when row is tapped on
 * @param selectedIcon - Component to display for icon when user is selected
 * @param unselectedIcon - Component to display for icon when user is not selected
 *
 *
 */
const UserRow = ({
  item,
  handleSelectUser,
  selectedIcon,
  unselectedIcon,
}: UserRowProps) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((str) => str[0])
      .join("");

    // return maximum first two only
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };

  return (
    <TouchableHighlight
      activeOpacity={0.85}
      underlayColor="#E5E5E5"
      onPress={() => handleSelectUser(item)}
      style={{ borderRadius: 8 }}
    >
      <Box flexDir="row" my="sm" justifyContent="space-between" px="md">
        <Box justifyContent="center" mr="lg">
          {item.thumbnail ? (
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
          {item.selected ? selectedIcon : unselectedIcon}
        </Box>
      </Box>
    </TouchableHighlight>
  );
};

export default UserRow;
