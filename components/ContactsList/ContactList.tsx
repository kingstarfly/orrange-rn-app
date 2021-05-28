import { theme } from "constants/theme";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input } from "react-native-magnus";
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
      let toChangeIndex = prevArr.findIndex((old) => old.id === contact.id);
      let toChange = prevArr[toChangeIndex];
      let newContact = {
        ...toChange,
        selected: !toChange.selected,
      };
      return [
        ...prevArr.slice(0, toChangeIndex),
        newContact,
        ...prevArr.slice(toChangeIndex + 1),
      ];
    });
  };
  const renderItem = ({ item }: { item: ContactDetails }) => (
    <ContactItem item={item} handleSelectContact={handleSelectContact} />
  );

  const listHeader = (
    <Input
      placeholder="Add your pals..."
      py="sm"
      mb="sm"
      focusBorderColor="blue700"
      prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
      borderColor={theme.colors.linegray}
      borderWidth={2}
    />
  );

  return (
    <Box w="95%">
      <Input
        placeholder="Add your pals..."
        py="sm"
        mb="sm"
        focusBorderColor="blue700"
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        borderColor={theme.colors.linegray}
        borderWidth={2}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={
          {
            // borderWidth: 0.8,
            // borderTopWidth: 0,
            // borderColor: theme.colors.linegray,
            // borderRadius: 15,
          }
        }
        // ListHeaderComponent={listHeader}
      />
    </Box>
  );
};

export default ContactList;
