import React, { useEffect, useState } from "react";
import { Box, Text } from "react-native-magnus";
import ContactList from "screens/Create/MeetupDetails/ContactsList/ContactList";
import Container from "components/Container";
import { ContactDetails } from "types/types";
import SelectedFriends from "./SelectedFriends";
import { getMockUsers } from "mockapi";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setAllFriends } from "./FriendsSlice";

const AddFriends = () => {
  // todo obtain contacts from user first and put into state
  const contacts = useAppSelector((state) => state.Friends.allFriends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getContact = async () => {
      const initialContacts = await getMockUsers();
      dispatch(setAllFriends(initialContacts));
    };
    getContact();
  }, []);

  return (
    <Container>
      <Box w="100%" alignItems="center" justifyContent="flex-end">
        <Box w="100%" h="7%">
          <SelectedFriends />
        </Box>

        <Box w="100%" h="93%">
          <ContactList contacts={contacts} />
        </Box>
      </Box>
    </Container>
  );
};

export default AddFriends;
