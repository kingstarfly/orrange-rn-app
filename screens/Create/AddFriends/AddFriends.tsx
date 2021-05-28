import React, { useEffect, useState } from "react";
import { Box, Text } from "react-native-magnus";
import ContactList from "components/ContactsList/ContactList";
import Container from "components/Container";
import { ContactDetails } from "types/types";
import SelectedFriends from "./SelectedFriends";
import { getMockUsers } from "mockapi";

const MOCK_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Justin Lim Office",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png",
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Desiree 👌",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png",
    selected: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Melissaaaa",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png",
    selected: false,
  },
];

const AddFriends = () => {
  // todo obtain contacts from user first and put into state
  const [contacts, setContacts] = useState<ContactDetails[]>([]);
  useEffect(() => {
    const getContact = async () => {
      const contacts = await getMockUsers();
      setContacts(contacts);
    };
    getContact();
  }, []);

  const handleSelectContact = (contact: ContactDetails) => {
    setContacts((prevArr) => {
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

  return (
    <Container>
      <Box w="100%" alignItems="center" justifyContent="flex-end">
        <Box w="100%" h="7%">
          <SelectedFriends
            selectedContacts={contacts.filter((contact) => contact.selected)}
          />
        </Box>

        <Box w="95%">
          <ContactList
            contacts={contacts}
            handleSelectContact={handleSelectContact}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AddFriends;
