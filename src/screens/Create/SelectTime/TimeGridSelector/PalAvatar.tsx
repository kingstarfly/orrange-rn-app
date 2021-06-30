import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-magnus";
import { OtherUser } from "types/types";

interface PalAvatarProps {
  contact: OtherUser;
}

const PalAvatar = ({ contact }: PalAvatarProps) => {
  return (
    <Avatar
      shadow={10}
      size={40}
      source={{
        uri: contact.url_thumbnail,
      }}
      mx="sm"
    />
  );
};

export default PalAvatar;
