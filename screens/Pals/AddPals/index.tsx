import Container from "components/Container";
import SearchableList from "components/SearchableList";
import { BodyText } from "components/StyledText";
import UserRow from "components/UserRow";
import { getMockUsers } from "mockapi";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-magnus";
import { ContactDetails } from "types/types";

const AddPals = () => {
  const [pals, setPals] = useState<ContactDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      setIsLoading(true);
      const initialPals = await getMockUsers();
      setPals(initialPals);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    getContact();
  }, []);
  const selectedIcon = <Icon name="codesquare" color="red500" fontSize="6xl" />;
  const unselectedIcon = <Icon name="heart" color="red500" fontSize="6xl" />;

  const toggleUser = (user: ContactDetails) => {
    // find the user
    setPals((prevPals) => {
      const index = prevPals.findIndex((pal) => pal.id === user.id);

      // keep track of before and after
      const before = prevPals.slice(0, index);
      const after = prevPals.slice(index + 1);

      // return new state
      return [
        ...before,
        {
          ...prevPals[index],
          selected: !prevPals[index].selected,
        },
        ...after,
      ];
    });
  };
  const renderItem = ({ item }: { item: ContactDetails }) => {
    return (
      <UserRow
        handleSelectUser={(user: ContactDetails) => toggleUser(user)}
        item={item}
        selectedIcon={selectedIcon}
        unselectedIcon={unselectedIcon}
      />
    );
  };

  return (
    <Container>
      <BodyText>AddPals</BodyText>
      <SearchableList
        data={pals}
        inputPlaceholder="Search..."
        isLoading={isLoading}
        renderItem={renderItem}
      />
      {/* <AddButton to="MeetupDetails" /> */}
    </Container>
  );
};

export default AddPals;
