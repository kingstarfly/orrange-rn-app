import { theme } from "constants/theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input, Text } from "react-native-magnus";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toggleSelectedState } from "screens/Create/MeetupDetails/AddFriends/AllFriendsSlice";
import { ContactDetails } from "types/types";
import ContactItem from "./ContactItem";

interface ContactsSearchableList {
  // contacts: ContactDetails[];
  isLoading: boolean;
}

const ContactsSearchableList = (props: ContactsSearchableList) => {
  const { isLoading } = props;
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const contacts = useAppSelector((state) => state.AllFriends.allFriends);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [searchQuery, setSearchQuery] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 0);
    };
  };
  const getFilteredResults = (
    contacts: ContactDetails[],
    searchQuery: string
  ) => {
    let filtered = contacts.filter((contact) => {
      return (
        !searchQuery ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredContacts(filtered);
  };

  useEffect(() => {
    getFilteredResults(contacts, searchQuery);
  }, [searchQuery, contacts]);

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const renderItem = ({ item }: { item: ContactDetails }) => (
    <ContactItem item={item} clearSearchQuery={clearSearchQuery} />
  );

  // const handleSearchInput = debounce((query: string) => {
  //   setSearchQuery(query);
  // });

  return (
    <Box
      justifyContent="flex-end"
      // borderColor="green500"
      // borderWidth={5}
    >
      <Input
        placeholder="Add your pals..."
        py="lg"
        mb="md"
        focusBorderColor="blue700"
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        borderColor={theme.colors.linegray}
        borderWidth={2}
        onChangeText={setSearchQuery}
        value={searchQuery}
        fontFamily="inter-regular"
        fontSize={16}
      />

      <FlatList
        data={filteredContacts}
        extraData={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default ContactsSearchableList;
