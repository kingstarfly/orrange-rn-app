import Container from "components/Container";
import SearchableList from "components/SearchableList";
import { BodyText, SubBodyNormalText } from "components/StyledText";
import UserRow from "components/UserRow";
import { PhosphorIcon } from "constants/Icons";
import { theme } from "constants/theme";
import { getMockAddPals, getMockUsers } from "mockapi";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { Box, Icon, Text } from "react-native-magnus";
import { NonPalContactDetails, PalDetails, USER_STATUS } from "types/types";
import AddPalButton from "./Buttons/AddPalButton";
import InviteSentButton from "./Buttons/InviteSentButton";
import InviteTootleButton from "./Buttons/InviteTootleButton";
import RequestedPalButton from "./Buttons/RequestedPalButton";

const AddPals = () => {
  const [pals, setPals] = useState<NonPalContactDetails[]>([]);
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

  const renderItem = ({ item }: { item: NonPalContactDetails }) => {
    const { palStatus } = item;
    let rightComponent: JSX.Element;

    switch (palStatus) {
      case USER_STATUS.notOnApp:
        rightComponent = (
          <TouchableHighlight onPress={() => console.log(item.name)}>
            {/* todo add press functionalities */}
            <InviteTootleButton />
          </TouchableHighlight>
        );
        break;
      case USER_STATUS.inviteSent:
        rightComponent = <InviteSentButton />;
        break;
      case USER_STATUS.notPal:
        rightComponent = <AddPalButton />;
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
