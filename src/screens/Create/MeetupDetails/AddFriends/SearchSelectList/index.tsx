import SearchableList from "components/SearchableList";
import { theme } from "constants/theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input, Text } from "react-native-magnus";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toggleSelectedState } from "redux/slices/AllFriendsSlice";
import { OtherUser, TootleUser } from "types/types";
import ContactItem from "./ContactItem";

interface ContactsSearchableList {
  // contacts: TootleUser[];
  isLoading: boolean;
}

const SearchSelectList = (props: ContactsSearchableList) => {
  const { isLoading } = props;

  const contacts = useAppSelector((state) => state.AllFriends.allFriends);

  const [filteredContacts, setFilteredContacts] = useState<OtherUser[]>();

  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredResults = (contacts: OtherUser[], searchQuery: string) => {
    if (!contacts) {
      return null;
    }
    let filtered = contacts.filter((contact) => {
      return (
        !searchQuery ||
        (contact.firstName + " " + contact.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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

  const renderItem = ({ item }: { item: OtherUser }) => (
    <ContactItem item={item} clearSearchQuery={clearSearchQuery} />
  );

  return (
    <SearchableList
      data={filteredContacts}
      isLoading={isLoading}
      renderItem={renderItem}
      inputPlaceholder="Search your pals..."
    />
  );
};

export default SearchSelectList;
