import SearchableList from "components/SearchableList";
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
    <SearchableList
      data={filteredContacts}
      isLoading={isLoading}
      renderItem={renderItem}
      inputPlaceholder="Add your pals..."
    />
  );
};

export default ContactsSearchableList;
