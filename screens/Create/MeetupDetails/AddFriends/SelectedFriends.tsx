import React from "react";
import PalAvatar from "screens/Create/SelectTime/TimeGridSelector/PalAvatar";
import { FlatList } from "react-native-gesture-handler";
import { ContactDetails } from "types/types";
import { useAppSelector } from "redux/hooks";
import { Box } from "react-native-magnus";

const SelectedFriends = () => {
  const selectedContacts = useAppSelector(
    (state) => state.SelectedFriends.selectedFriends
  );

  const renderItem = ({ item }: { item: ContactDetails }) => (
    <PalAvatar contact={item} />
  );
  return (
    <FlatList
      horizontal
      data={selectedContacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SelectedFriends;
