import PalAvatar from "components/TimeGridSelector/PalAvatar";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Box, Text } from "react-native-magnus";
import { ContactDetails } from "types/types";

interface SelectedFriendsProp {
  selectedContacts: ContactDetails[];
}
const SelectedFriends = ({ selectedContacts }: SelectedFriendsProp) => {
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
