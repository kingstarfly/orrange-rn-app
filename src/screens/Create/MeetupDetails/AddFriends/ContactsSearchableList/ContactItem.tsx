import UserRow from "components/UserRow";
import { theme } from "src/constants/theme";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-magnus";
import { useAppDispatch } from "src/redux/hooks";
import { toggleSelectedState } from "src/redux/slices/AllFriendsSlice";
import { onSelectFriend } from "src/redux/slices/SelectedFriendsSlice";
import { TootleUser } from "types/types";

interface ContactItemProps {
  item: TootleUser;
  clearSearchQuery: () => void;
}

const ContactItem = ({ item, clearSearchQuery }: ContactItemProps) => {
  const dispatch = useAppDispatch();
  const handleSelectContact = (contact: TootleUser) => {
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
        item={item}
        rightIcon={item.selected ? selectedIcon : unselectedIcon}
      />
    </TouchableHighlight>
  );
};

export default ContactItem;
