import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FlatList, ListRenderItem } from "react-native";
import { Box } from "react-native-magnus";
import Loading from "./Loading";
import { SearchInput } from "./StyledInput";

interface SearchableListProps<ItemProp> {
  data: ItemProp[];
  isLoading: boolean;
  renderItem: ListRenderItem<ItemProp>;
  inputPlaceholder: string;
  showOnlyWhenSearch?: boolean;
}

const SearchableList = <
  ItemProp extends {
    id?: string;
    uid?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    username?: string;
  }
>({
  data,
  isLoading,
  renderItem,
  inputPlaceholder,
  showOnlyWhenSearch,
}: SearchableListProps<ItemProp>) => {
  if (isLoading) {
    return <Loading />;
  }

  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredUsers = React.useCallback(
    (users: ItemProp[]) => {
      if (!users) {
        return [];
      }
      if (showOnlyWhenSearch && !searchQuery) {
        return [];
      }
      let filtered = users.filter((user) => {
        return (
          !searchQuery ||
          user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user?.firstName + " " + user?.lastName)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      return filtered;
    },
    [searchQuery]
  );

  return (
    <Box justifyContent="flex-end">
      <SearchInput
        inputPlaceholder={inputPlaceholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        showPrefix
        mb={8}
      />

      <FlatList
        data={getFilteredUsers(data)}
        extraData={getFilteredUsers(data)}
        keyExtractor={(item) => item.id || item.uid}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={() => {
        //   if (showOnlyWhenSearch) {
        //     return (
        //       <BodyTextRegular>
        //         Start searching to see results...
        //       </BodyTextRegular>
        //     );
        //   }
        // }}
      />
    </Box>
  );
};

export default SearchableList;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginLeft: "18%",
  },
});
