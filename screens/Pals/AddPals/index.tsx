import Container from "components/Container";
import SearchableList from "components/SearchableList";
import UserRow from "components/UserRow";
import { theme } from "constants/theme";
import { addPal, inviteContactToapp } from "lib/api/pals";
import { getMockAddPals } from "mockapi";
import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Text } from "react-native-magnus";
import { NonTootleUser, TootleUser, USER_STATUS, Person } from "types/types";
import AddPalButton from "./Buttons/AddPalButton";
import InviteSentButton from "./Buttons/InviteSentButton";
import InviteTootleButton from "./Buttons/InviteTootleButton";
import RequestedPalButton from "./Buttons/RequestedPalButton";

const AddPals = () => {
  const [pals, setPals] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      setIsLoading(true);
      const initialPals = await getMockAddPals();
      setPals(initialPals);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    getContact();
  }, []);

  const renderItem = ({ item }: { item: Person }) => {
    const { status } = item;
    let rightComponent: JSX.Element;

    switch (status) {
      case USER_STATUS.notOnApp:
        rightComponent = (
          <Button
            p="none"
            bg={theme.colors.primary400}
            underlayColor={theme.colors.primary200}
            onPress={() => inviteContactToapp(item as NonTootleUser)}
          >
            <InviteTootleButton />
          </Button>
        );
        break;
      case USER_STATUS.inviteSent:
        rightComponent = <InviteSentButton />;
        break;
      case USER_STATUS.notPal:
        rightComponent = (
          <Button
            p="none"
            bg={theme.colors.primary400}
            underlayColor={theme.colors.primary200}
            onPress={() =>
              addPal(
                {
                  id: "123",
                  name: "test_current_user",
                  contactNumber: "123123",
                },
                item as TootleUser
              )
            }
          >
            <AddPalButton />
          </Button>
        );
        break;
      case USER_STATUS.palRequestSent:
        rightComponent = <RequestedPalButton />;
        break;

      default:
        break;
    }
    return <UserRow item={item} rightIcon={rightComponent} />;
  };

  return (
    <Container>
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
