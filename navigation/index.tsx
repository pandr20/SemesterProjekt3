/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName, Pressable, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/GlobalScreens/NotFoundScreen";

import TabOneScreen from "../screens/TabOneScreen/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen/TabThreeScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import PlaylistScreen from "../screens/TabThreeScreen/PlaylistScreen";
import CreatePlaylistScreen from "../screens/TabThreeScreen/Subscreens/CreatePlaylistScreen";
import PlaylistsOverview from "../screens/TabThreeScreen/Subscreens/PlaylistsOverview";
import AlbumsOverview from "../screens/TabThreeScreen/Subscreens/AlbumsOverview";
import AlbumScreen from "../screens/TabThreeScreen/Subscreens/AlbumScreen";
import ArtistsOverview from "../screens/TabThreeScreen/Subscreens/ArtistsOverview";
import SongsOverview from "../screens/TabThreeScreen/Subscreens/SongsOverview";
//@ts-ignore
import MediaPlayer from "../screens/GlobalScreens/MediaPlayer"; //giver error, men virker stadig :-)
import ArtistScreen from "../screens/GlobalScreens/ArtistScreen";
import { LoginScreen } from "../screens/GlobalScreens/LoginScreen";
import { useMemo } from "react";
import { AuthContext } from "../context";

import AsyncStorage from "@react-native-community/async-storage";

export function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export function AuthNavigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen} 
        options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
/**
 * For tilføje en ny Stack eller navigation, så gå ind i types.tsx
 * Og tilføj den derinde. Derefter kan den sættes som 'name' her nedenunder.
 */
function RootNavigator() {

  
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="PlaylistScreen"
        component={PlaylistScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="CreatePlaylistScreen"
        component={CreatePlaylistScreen}
        options={{ title: "Create a new playlist" }}
      />
      <Stack.Screen
        name="PlaylistsOverview"
        component={PlaylistsOverview}
        options={{ title: "Playlists" }}
      />
      <Stack.Screen
        name="ArtistsOverview"
        component={ArtistsOverview}
        options={{ title: "Artists" }}
      />
      <Stack.Screen
        name="ArtistScreen"
        component={ArtistScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="AlbumsOverview"
        component={AlbumsOverview}
        options={{ title: "Albums" }}
      />
      <Stack.Screen
        name="SongsOverview"
        component={SongsOverview}
        options={{ title: "Songs" }}
      />
      <Stack.Screen
        name="MediaPlayer"
        component={MediaPlayer}
        options={{ title: "" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="home" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons
                name="account-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<"TabTwo">) => ({
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="search" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons
                name="account-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={({ navigation }: RootTabScreenProps<"TabThree">) => ({
          title: "Library",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="my-library-music" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons
                name="account-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarFontAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * "den gamle playliste knap"
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Playlist")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons
                name="my-library-music"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
 */
