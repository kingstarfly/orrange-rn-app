import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PhosphorIcon } from "constants/Icons";
import { headerHeight } from "constants/Layout";
import { theme } from "constants/theme";
import { useAuth } from "lib/auth";
import React from "react";
import { Alert } from "react-native";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import {
  Badge,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  Drawer,
  DrawerRef,
  Button,
} from "react-native-magnus";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppStackParamList } from "types/types";
import AppLogo from "./AppLogo";
import AvatarIcon from "./AvatarIcon";
import Container from "./Container";
import { BodyTextMedium, BodyTextRegular } from "./StyledText";
import withBadge from "./TimeGridSelector/withBadge";

interface Props {
  hideLogo?: boolean;
}

const TopNavBar = ({ hideLogo }: Props) => {
  const BadgedIcon = withBadge(1)(PhosphorIcon);
  const { top } = useSafeAreaInsets();

  const navigation =
    useNavigation<
      StackNavigationProp<AppStackParamList, "MainBottomTabNavigator">
    >();

  const authData = useAuth();
  const drawerRef = React.useRef<DrawerRef>();

  const handleSignOut = async () => {
    Alert.alert("", "Are you sure you want to sign out of Orrange?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => authData.signOut() },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingTop: top,
        width: WINDOW_WIDTH,
        height: headerHeight,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            alignItems: "flex-start",
            bottom: 8,
            marginRight: 15,
          }}
          onPress={() => {
            if (drawerRef.current) {
              drawerRef?.current.open();
            }
          }}
        >
          <PhosphorIcon name="list" size={28} color={theme.colors.textdark} />
        </Pressable>
        <View>{!hideLogo && <AppLogo />}</View>
      </View>

      <TouchableOpacity
        style={{
          bottom: 10, // the icon is not centered, this is the fix
          right: 35,
          alignItems: "flex-start",
        }}
        onPress={() => {
          navigation.push("Contacts");
        }}
      >
        <PhosphorIcon name="envelope" color={theme.colors.textdark} size={40} />
      </TouchableOpacity>
      <Drawer ref={drawerRef}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            paddingHorizontal: 12,
            backgroundColor: theme.colors.backgroundlight,
          }}
        >
          <View style={{ marginBottom: 16 }}>
            <AvatarIcon
              diameter={60}
              uri={authData.userData.url_thumbnail}
              label={
                authData.userData.firstName + authData.userData.lastName
                  ? ` ${authData.userData.lastName}`
                  : ""
              }
            />
          </View>

          <BodyTextMedium>
            {authData.userData.firstName} {authData.userData.lastName}
          </BodyTextMedium>
          <BodyTextRegular color={theme.colors.textgray400}>
            @{authData.userData.username}
          </BodyTextRegular>
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity
              onPress={() => handleSignOut()}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PhosphorIcon
                name="sign-out"
                size={30}
                color={theme.colors.textgray400}
              />

              <BodyTextMedium ml={16}>Sign out</BodyTextMedium>
            </TouchableOpacity>
          </View>
        </View>
      </Drawer>
    </View>
  );
};

export default TopNavBar;
