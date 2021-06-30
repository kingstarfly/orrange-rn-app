import UserRow from "components/UserRow";
import { theme } from "constants/theme";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import { toggleSelectedState } from "redux/slices/AllFriendsSlice";
import { onSelectFriend } from "redux/slices/SelectedFriendsSlice";
import { OtherUser } from "types/types";

interface ContactItemProps {
  item: OtherUser;
  clearSearchQuery: () => void;
}

const ContactItem = ({ item, clearSearchQuery }: ContactItemProps) => {
  const dispatch = useAppDispatch();

  const handleSelectContact = (contact: OtherUser) => {
    dispatch(toggleSelectedState(contact));
    dispatch(onSelectFriend(contact));
    clearSearchQuery();
  };

  const selectedIcon = (
    <Icon
      name={"check-circle"}
      color={theme.colors.primary500}
      fontFamily="MaterialCommunityIcons"
      fontSize="4xl"
    />
  );

  const unselectedIcon = (
    <Icon
      name={"checkbox-blank-circle-outline"}
      color={theme.colors.linegray}
      fontFamily="MaterialCommunityIcons"
      fontSize="4xl"
    />
  );

  return (
    <TouchableHighlight
      activeOpacity={0.85}
      underlayColor="#E5E5E5"
      onPress={() => handleSelectContact(item)}
      style={{ borderRadius: 8 }}
    >
      <UserRow
        // item={item}
        avatar_url={item.url_thumbnail}
        firstName={item.firstName}
        rightItem={item.selected ? selectedIcon : unselectedIcon}
      />
    </TouchableHighlight>
  );
};

export default ContactItem;
