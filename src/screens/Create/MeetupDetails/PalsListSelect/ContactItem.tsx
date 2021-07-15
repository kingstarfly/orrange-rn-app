import UserRow from "components/UserRow";
import { theme } from "constants/theme";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Icon } from "react-native-magnus";
import { OtherUser } from "types/types";

interface ContactItemProps {
  item: OtherUser;
  onSelectItem: (item: OtherUser) => void;
}

const ContactItem = ({ item, onSelectItem }: ContactItemProps) => {
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
      onPress={() => onSelectItem(item)}
      style={{ borderRadius: 8 }}
    >
      <UserRow
        avatar_url={item?.url_thumbnail}
        username={item?.username}
        firstName={item?.firstName}
        rightItem={item?.selected ? selectedIcon : unselectedIcon}
      />
    </TouchableHighlight>
  );
};

export default ContactItem;
