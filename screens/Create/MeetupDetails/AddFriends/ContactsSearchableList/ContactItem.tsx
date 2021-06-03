import UserRow from "components/UserRow";
import { theme } from "constants/theme";
import React from "react";
import { Icon } from "react-native-magnus";
import { useAppDispatch } from "redux/hooks";
import { toggleSelectedState } from "screens/Create/MeetupDetails/AddFriends/AllFriendsSlice";
import { onSelectFriend } from "screens/Create/MeetupDetails/AddFriends/SelectedFriendsSlice";
import { ContactDetails } from "types/types";

interface ContactItemProps {
  item: ContactDetails;
  clearSearchQuery: () => void;
}

const ContactItem = ({ item, clearSearchQuery }: ContactItemProps) => {
  const dispatch = useAppDispatch();
  const handleSelectContact = (contact: ContactDetails) => {
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
    <UserRow
      item={item}
      handleSelectUser={handleSelectContact}
      selectedIcon={selectedIcon}
      unselectedIcon={unselectedIcon}
    />
  );
};

export default ContactItem;
