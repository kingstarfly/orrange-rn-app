import React, { useEffect, useState } from "react";
import { Box, DivProps } from "react-native-magnus";
import { getMockUsers } from "mockapi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateMeetupStackParamList, OtherUser } from "types/types";
import ContactItem from "./ContactItem";
import { FlatList } from "react-native-gesture-handler";
import PalAvatar from "screens/Plan/SelectTime/TimeGridSelector/PalAvatar";
import { SearchInput } from "components/StyledInput";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { onSelectPal } from "redux/slices/SelectedPalsSlice";
import { useAuth } from "lib/auth";
import { getPals } from "lib/api/pals";
import { BodyTextRegular } from "components/StyledText";
import { theme } from "constants/theme";

interface Props extends DivProps {
  isLoading: boolean;
  pals: OtherUser[];
  setPals: React.Dispatch<React.SetStateAction<OtherUser[]>>;
}

const PalsListSelect = ({ isLoading, pals, setPals, ...rest }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedPals = useAppSelector(
    (state) => state.SelectedPals.selectedPals
  );

  const dispatch = useAppDispatch();

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-end" {...rest}>
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
          <Box my={8}>
            <SearchInput
              inputPlaceholder="Search your pals..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              showPrefix
            />
          </Box>

          <FlatList
            refreshing={isLoading}
            data={getFilteredResults(pals, searchQuery)}
            keyExtractor={(item) => item.id || item.uid}
            renderItem={({ item }: { item: OtherUser }) => (
              <ContactItem
                item={item}
                onSelectItem={(pal: OtherUser) => {
                  if (!pal.selected) {
                    // setSelectedPals((old) => [...old, pal]);
                    dispatch(onSelectPal(pal));
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
                    // setSelectedPals((old) =>
                    //   old.filter((e) => e.uid !== pal.uid)
                    // );
                    dispatch(onSelectPal(pal));
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
            ListEmptyComponent={
              <Box justifyContent="center" alignItems="center" mt={50}>
                <BodyTextRegular color={theme.colors.textgray200}>
                  Looks like this is empty...
                </BodyTextRegular>
              </Box>
            }
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
