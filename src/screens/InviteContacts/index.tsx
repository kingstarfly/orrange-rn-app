import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import Container from "components/Container";
import SearchableList from "components/SearchableList";
import UserRow from "components/UserRow";
import { theme } from "constants/theme";
import { addPal, getAllNonPals, inviteContactToapp } from "lib/api/pals";
import { useAuth } from "lib/auth";
import { getMockAddPals } from "mockapi";
import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Text } from "react-native-magnus";
import { OtherUser, PalsStackParamList } from "types/types";
import InviteSentButton from "./Buttons/InviteSentButton";
import InviteTootleButton from "./Buttons/InviteTootleButton";

const InviteContacts = () => {
  // TODO: To create new type to describe a contact. All code is unusable here now.
  const [contacts, setContacts] = useState<OtherUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const authData = useAuth();
  const navigation =
    useNavigation<StackNavigationProp<PalsStackParamList, "AddPals">>();

  // retrieve all users from database, also include current friends. To display "friends" indicator.
  const fetchAllNonPals = async () => {
    const nonPalUsers = await getAllNonPals(authData.userData.uid);
    setNonPals(nonPalUsers);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchAllNonPals().finally(() => {
        setIsLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: OtherUser }) => {
    let rightComponent: JSX.Element;

    // switch (status) {
    //   case USER_STATUS.notOnApp:
    //     rightComponent = (
    //       <Button
    //         p="none"
    //         bg={theme.colors.primary400}
    //         underlayColor={theme.colors.primary200}
    //         onPress={() => inviteContactToapp(item as NonTootleUser)}
    //       >
    //         <InviteTootleButton />
    //       </Button>
    //     );
    //     break;
    //   case USER_STATUS.inviteSent:
    //     rightComponent = <InviteSentButton />;
    //     break;
    //   case USER_STATUS.notPal:
    //     rightComponent = (
    //       <Button
    //         p="none"
    //         bg={theme.colors.primary400}
    //         underlayColor={theme.colors.primary200}
    //         onPress={() =>
    //           addPal(
    //             {
    //               id: "123",
    //               name: "test_current_user",
    //               contactNumber: "123123",
    //             },
    //             item as TootleUser
    //           )
    //         }
    //       >
    //         <AddPalButton />
    //       </Button>
    //     );
    //     break;
    //   case USER_STATUS.palRequestSent:
    //     rightComponent = <RequestedPalButton />;
    //     break;

    //   default:
    //     break;
    // }
    return (
      <UserRow
        avatar_url={item.url_thumbnail}
        firstName={item.firstName}
        lastName={item.lastName}
        username={item.username}
        rightItem={rightComponent}
      />
    );
  };

  return (
    <Container avoidHeader>
      <SearchableList
        data={nonPals}
        inputPlaceholder="Search..."
        isLoading={isLoading}
        renderItem={renderItem}
      />
      {/* <AddButton to="MeetupDetails" /> */}
    </Container>
  );
};

export default InviteContacts;
