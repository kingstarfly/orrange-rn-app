import { theme } from "constants/theme";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Box, Icon, Input } from "react-native-magnus";
import { ContactDetails } from "types/types";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: ContactDetails[];
  handleSelectContact: (contact: ContactDetails) => void;
}

const ContactList = ({ contacts, handleSelectContact }: ContactListProps) => {
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
    <Box>
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
        data={contacts}
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
