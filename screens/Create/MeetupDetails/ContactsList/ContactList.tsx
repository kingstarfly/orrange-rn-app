import { theme } from "constants/theme";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input } from "react-native-magnus";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { onSelectFriend } from "screens/Create/AddFriends/FriendsSlice";
import { ContactDetails } from "types/types";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: ContactDetails[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  const dispatch = useAppDispatch();

  const handleSelectContact = (contact: ContactDetails) => {
    dispatch(onSelectFriend(contact));
  };

  const renderItem = ({ item }: { item: ContactDetails }) => (
    <ContactItem item={item} handleSelectContact={handleSelectContact} />
  );

  const [filteredContacts, setFilteredContacts] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 200);
    };
  };

  // todo make filteredContent depend on redux state, not local state. Also, doesnt seem like the checkmark is working suddenly?
  const handleSearchInput = useCallback(
    debounce((searchQuery: string) => {
      let filtered = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredContacts(filtered);
    }),
    [contacts]
  );

  // const listHeader = (
  //   <Input
  //     placeholder="Add your pals..."
  //     py="sm"
  //     mb="sm"
  //     focusBorderColor="blue700"
  //     prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
  //     borderColor={theme.colors.linegray}
  //     borderWidth={2}
  //   />
  // );

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
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{}}
        // ListHeaderComponent={listHeader}
      />
    </Box>
  );
};

export default ContactList;
