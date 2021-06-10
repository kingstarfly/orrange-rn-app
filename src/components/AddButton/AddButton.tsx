import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { theme } from "src/constants/theme";
import React from "react";
import { Box, Button, Icon } from "react-native-magnus";

const CreateButton = ({ to }: { to: string }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <Box position="absolute" bottom={24} right={24} zIndex={2}>
      <Button
        bg={theme.colors.primary600}
        h={64}
        w={64}
        rounded="circle"
        onPress={() => navigation.push(to)}
      >
        <Icon
          name="add-sharp"
          fontFamily="Ionicons"
          color={theme.colors.backgroundlight}
          h={64}
          w={64}
          fontSize={48}
          p={10}
        />
      </Button>
    </Box>
  );
};

export default CreateButton;
