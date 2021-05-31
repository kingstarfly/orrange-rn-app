import { theme } from "constants/theme";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input, Text } from "react-native-magnus";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toggleSelectedState } from "screens/Create/AddFriends/AllFriendsSlice";
import { ContactDetails } from "types/types";
import ContactItem from "./ContactItem";

interface ContactsSearchableList {
  // contacts: ContactDetails[];
  isLoading: boolean;
}

const ContactsSearchableList = (props: ContactsSearchableList) => {
  const { isLoading } = props;
  const contacts = useAppSelector((state) => state.AllFriends.allFriends);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = contacts.filter((contact) => {
      return (
        !searchQuery ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    console.log(filtered);
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }: { item: ContactDetails }) => (
    <ContactItem item={item} />
  );

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 100);
    };
  };
  const handleSearchInput = debounce((query: string) => {
    setSearchQuery(query);
  });

  return (
    <Box h="100%" w="100%">
      <Input
        placeholder="Add your pals..."
        py="sm"
        mb="sm"
        focusBorderColor="blue700"
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        borderColor={theme.colors.linegray}
        borderWidth={2}
        onChangeText={handleSearchInput}
      />

      <FlatList
        data={filteredContacts.length ? filteredContacts : contacts}
        extraData={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default ContactsSearchableList;
