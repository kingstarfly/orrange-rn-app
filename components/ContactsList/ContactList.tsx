import { theme } from "constants/theme";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input, Text } from "react-native-magnus";
import ContactItem from "./ContactItem";

const MOCK_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Justin Lim Office",
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Desiree 👌",
    selected: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Melissaaaa",
    selected: false,
  },
];

export interface ContactDetails {
  id: string;
  name: string;
  selected: boolean;
}

const ContactList = () => {
  const [data, setData] = useState(MOCK_DATA);

  const handleSelectContact = (contact: ContactDetails) => {
    setData((prevArr) => {
      return [
        ...prevArr.filter((old) => old.id !== contact.id),
        { ...contact, selected: !contact.selected },
      ];
    });
    // change the selected field in data to selected
  };
  const renderItem = ({ item }: ContactDetails) => (
    <ContactItem
      name={item.name}
      handleSelectContact={handleSelectContact}
      isSelected={item.selected}
    />
  );

  return (
    <Box>
      <Input
        placeholder="Add your pals..."
        py="sm"
        focusBorderColor="blue700"
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        w="95%"
        mb="lg"
        borderColor={theme.colors.linegray}
        borderWidth={0.8}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          paddingHorizontal: 18,
          borderWidth: 0.8,
          borderTopWidth: 0,
          borderColor: theme.colors.linegray,
        }}
      />
    </Box>
  );
};

export default ContactList;
