import { theme } from "src/constants/theme";
import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Box, Icon, Input, Text } from "react-native-magnus";

interface SearchableListProps<ItemProp> {
  data: ItemProp[];
  isLoading: boolean;
  // onSelectRow: () => void;
  renderItem: ListRenderItem<ItemProp>;
  inputPlaceholder: string;
}

const SearchableList = <ItemProp extends { id?: string; name?: string }>({
  data,
  isLoading,
  renderItem,
  inputPlaceholder,
}: SearchableListProps<ItemProp>) => {
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredUsers = (users: ItemProp[]) => {
    let filtered = users.filter((user) => {
      return (
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    return filtered;
  };

  return (
    <Box justifyContent="flex-end">
      <Input
        placeholder={inputPlaceholder}
        py="lg"
        mb="md"
        focusBorderColor="blue700"
        prefix={<Icon name="search" color="gray900" fontFamily="Feather" />}
        borderColor={theme.colors.linegray}
        borderWidth={2}
        onChangeText={setSearchQuery}
        value={searchQuery}
        fontFamily="inter-regular"
        fontSize={16}
      />

      <FlatList
        data={getFilteredUsers(data)}
        extraData={getFilteredUsers(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default SearchableList;
