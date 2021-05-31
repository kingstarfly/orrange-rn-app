import React, { useEffect, useState } from "react";
import { Box, Text } from "react-native-magnus";
import ContactsSearchableList from "screens/Create/MeetupDetails/ContactsSearchableList";
import Container from "components/Container";
import SelectedFriends from "./SelectedFriends";
import { getMockUsers } from "mockapi";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setAllFriends } from "./AllFriendsSlice";

const AddFriends = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.AllFriends.allFriends);
  const [isLoading, setIsLoading] = useState(true);

  // todo obtain contacts from user first and put into state, account for loading time
  useEffect(() => {
    const getContact = async () => {
      const initialContacts = await getMockUsers();
      dispatch(setAllFriends(initialContacts));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
          <ContactsSearchableList isLoading={isLoading} />
        </Box>
      </Box>
    </Container>
  );
};

export default AddFriends;
