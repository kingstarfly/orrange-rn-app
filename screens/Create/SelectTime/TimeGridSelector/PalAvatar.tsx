import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-magnus";
import { ContactDetails } from "types/types";

interface PalAvatarProps {
  contact: ContactDetails;
}

const PalAvatar = ({ contact }: PalAvatarProps) => {
  return (
    <Avatar
      shadow={10}
      size={40}
      source={{
        uri: contact.thumbnail,
      }}
      mx="sm"
    />
  );
};

export default PalAvatar;
