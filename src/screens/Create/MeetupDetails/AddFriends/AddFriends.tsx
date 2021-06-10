import React, { useEffect, useState } from "react";
import { Box, DivProps, Text } from "react-native-magnus";
import ContactsSearchableList from "src/screens/Create/MeetupDetails/AddFriends/ContactsSearchableList";
import SelectedFriends from "./SelectedFriends";
import { getMockUsers } from "src/mockapi";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setAllFriends } from "../../../../redux/slices/AllFriendsSlice";
import { useWindowDimensions } from "react-native";

const AddFriends = (props: DivProps) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.AllFriends.allFriends);
  const [isLoading, setIsLoading] = useState(true);
  const { height, width } = useWindowDimensions();

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
    <Box flex={1} alignItems="center" justifyContent="flex-end" {...props}>
      <Box w="100%" py="md">
        <SelectedFriends />
      </Box>

      <Box w="100%" flex={1}>
        <ContactsSearchableList isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default AddFriends;
