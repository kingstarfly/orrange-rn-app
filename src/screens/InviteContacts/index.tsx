import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import Container from "components/Container";
import SearchableList from "components/SearchableList";
import SmallButton from "components/SmallButton";
import UserRow from "components/UserRow";
import { useAuth } from "lib/auth";
import React, { useEffect, useState } from "react";
import { Share, Text, View } from "react-native";
import { OtherUser, PalsStackParamList, UserData } from "types/types";
import * as Contacts from "expo-contacts";
import { getAllOrrangeUsersPhoneNumbers } from "lib/api/pals";
import { sanitizePhoneNumber } from "screens/ViewPlans/helper";

const InviteContactsScreen = () => {
  const [contacts, setContacts] = useState<OtherUser[]>([]);

  const [isListLoading, setIsListLoading] = useState(false);
  const authData = useAuth();
  const navigation =
    useNavigation<StackNavigationProp<PalsStackParamList, "AddPals">>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Emails,
              Contacts.Fields.Name,
              Contacts.Fields.PhoneNumbers,
            ],
          });

          const allOrrangeUsersPhoneNumbers =
            await getAllOrrangeUsersPhoneNumbers();

          console.log(data);
          console.log(allOrrangeUsersPhoneNumbers);

          // Remove contacts that are not already on Orrange
          const filteredContacts = data
            .filter((contact) => {
              const primary =
                contact?.phoneNumbers?.find((e) => e.isPrimary) ||
                contact.phoneNumbers?.[0];
              if (!primary) return false;
              return !allOrrangeUsersPhoneNumbers.includes(
                sanitizePhoneNumber(primary.countryCode, primary.number)
              );
            })
            .map((contact) => {
              // Convert Contact to OtherUser
              const primary =
                contact?.phoneNumbers?.find((e) => e.isPrimary) ||
                contact.phoneNumbers?.[0];

              const res: OtherUser = {
                firstName:
                  contact.firstName || contact.lastName || contact.name || "",
                lastName: contact.lastName || "",
                contact: sanitizePhoneNumber(
                  primary.countryCode,
                  primary.number
                ),
                uid: contact.id,
                url_thumbnail: "",
                username: "",
              };
              return res;
            })
            .filter((c) => c.contact !== undefined);
          console.log("Hello");
          console.log(filteredContacts);
          setContacts(filteredContacts);
        }
      })();
    });
    return unsubscribe;
  }, []);

  const handleInviteButtonClick = async () => {
    // TODO: Trigger sending msg on tele / whatsapp using react native share
    try {
      const result = await Share.share({
        message:
          "Hey, I'm using Orrange to arrange meetups with friends! Join me here: https://orrange.app/dl",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({ item: otherUser }: { item: OtherUser }) => {
    let rightComponent = (
      <SmallButton
        onPress={() => handleInviteButtonClick()}
        colorTheme="primary"
      >
        Invite
      </SmallButton>
    );

    return (
      <UserRow
        // avatar_url={otherUser.url_thumbnail}
        firstName={otherUser.firstName}
        lastName={otherUser.lastName}
        rightItem={rightComponent}
      />
    );
  };

  return (
    <Container avoidHeader>
      <SearchableList
        data={contacts}
        inputPlaceholder="Search my contacts"
        isLoading={isListLoading}
        renderItem={renderItem}
        showOnlyWhenSearch={true}
      />
    </Container>
  );
};

export default InviteContactsScreen;
