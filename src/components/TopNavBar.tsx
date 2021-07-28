import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PhosphorIcon } from "constants/Icons";
import { headerHeight } from "constants/Layout";
import { theme } from "constants/theme";
import { useAuth } from "lib/auth";
import React from "react";
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
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              <PhosphorIcon
                name="sign-out"
                size={30}
                color={theme.colors.textgray400}
              />
              <TouchableOpacity
                onPress={() => authData.signOut()}
                style={{ marginLeft: 16 }}
              >
                <BodyTextMedium>Sign out</BodyTextMedium>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Drawer>
    </View>
  );
};

export default TopNavBar;
