import React, { useEffect, useState } from "react";
import { Box, DivProps, Text } from "react-native-magnus";
import { getMockUsers } from "mockapi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateMeetupStackParamList, OtherUser } from "types/types";
import SearchableList from "components/SearchableList";
import ContactItem from "./ContactItem";
import { FlatList } from "react-native-gesture-handler";
import PalAvatar from "screens/Plan/SelectTime/TimeGridSelector/PalAvatar";
import { SearchInput } from "components/StyledInput";
import { StyleSheet, View } from "react-native";

const PalsListSelect = (props: DivProps) => {
  const [pals, setPals] = React.useState<OtherUser[]>([]);
  const [selectedPals, setSelectedPals] = React.useState<OtherUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // todo obtain contacts from user first and put into state, account for loading time
  const navigation =
    useNavigation<
      StackNavigationProp<CreateMeetupStackParamList, "MeetupDetails">
    >();
  const getAllPals = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const initialContacts = await getMockUsers();
      const res = initialContacts.map((contact) => ({
        ...contact,
        selected: false,
      }));
      res.sort((a, b) => a.username.localeCompare(b.username));
      setPals(res);
    } catch (error) {
      console.error("Unable to fetch pals", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllPals();
  }, []);

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-end" {...props}>
      <Box w="100%" py="md">
        <FlatList
          horizontal
          data={selectedPals}
          renderItem={({ item }: { item: OtherUser }) => (
            <PalAvatar contact={item} />
          )}
          keyExtractor={(item) => item.uid}
        />
      </Box>

      <Box w="100%" flex={1}>
        <Box justifyContent="flex-end">
          <SearchInput
            inputPlaceholder="Search your pals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            showPrefix
          />

          <FlatList
            data={getFilteredResults(pals, searchQuery)}
            keyExtractor={(item) => item.id || item.uid}
            renderItem={({ item }: { item: OtherUser }) => (
              <ContactItem
                item={item}
                onSelectItem={(pal: OtherUser) => {
                  if (!pal.selected) {
                    setSelectedPals((old) => [...old, pal]);
                    setPals((old) => {
                      const ind = old.findIndex((e) => e.uid === pal.uid);
                      return [
                        ...old.slice(0, ind),
                        {
                          ...old[ind],
                          selected: true,
                        },
                        ...old.slice(ind + 1),
                      ];
                    });
                  } else {
                    setSelectedPals((old) =>
                      old.filter((e) => e.uid !== pal.uid)
                    );
                    setPals((old) => {
                      const ind = old.findIndex((e) => e.uid === pal.uid);
                      return [
                        ...old.slice(0, ind),
                        {
                          ...old[ind],
                          selected: false,
                        },
                        ...old.slice(ind + 1),
                      ];
                    });
                  }

                  // Only reset search query when user has input there. Use case is when user is de-selecting users.
                  searchQuery && setSearchQuery("");
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

const getFilteredResults = (contacts: OtherUser[], searchQuery: string) => {
  if (!contacts) {
    return null;
  }
  let filtered = contacts.filter((contact) => {
    return (
      !searchQuery ||
      (contact.firstName + " " + contact.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });
  return filtered;
};

export default PalsListSelect;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginLeft: "18%",
  },
});
