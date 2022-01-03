import * as React from "react";
import {
  Text as normText,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Text, View } from "../../../components/Themed";
import {
  ListItem,
  Avatar,
  ThemeProvider,
  colors,
  Button,
  Overlay,
} from "react-native-elements";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../../components/Layout";
import { PlaylistJSON } from "../../../types";
import { ScrollView } from "react-native-gesture-handler";
import { BlackText } from "../../../components/StyledText";
import AsyncStorage from "@react-native-community/async-storage";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default function PlaylistScreen({ navigation }: any) {
  const [data, setData] = useState<PlaylistJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const [visible, setVisible] = useState(false);

  const fetchToken = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.log(error);
    }
    //@ts-ignore
    userToken = userToken.replace(/['"]+/g, "");
    return userToken;
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const getPlaylists = async (token: string) => {
    try {
      axios
        .get(
          "http://express-server-react-native.herokuapp.com/playlists/" + token
        )
        .then((res) => {
          setData(res.data.playlists);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //@ts-ignore
  useEffect(async () => {
    //@ts-ignore
    getPlaylists(await fetchToken());
  }, []);

  return (
    <Layout>
      <SafeAreaView style={{ height: "100%" }}>
        <ThemeProvider theme={theme}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePlaylistScreen")}
            >
              <View style={styles.create}>
                <Text style={styles.text}>Create new playlist</Text>
              </View>
            </TouchableOpacity>
            {data.map((list, i) => (
              <TouchableOpacity
                key={i * 9834}
                onPress={() =>
                  navigation.navigate("PlaylistScreen", {
                    playlistName: list.name,
                    playlistCoverArt: list.coverArt,
                    playlistSongs: list.songs,
                  })
                }
              >
                <ListItem
                  //@ts-ignore
                  containerStyle={{
                    backgroundColor: Platform.select({
                      default: colors.platform.android,
                      ios: colors.platform.ios,
                    }),
                  }}
                  bottomDivider={false}
                  hasTVPreferredFocus={false} //for some reason it needs these properties
                  tvParallaxProperties={false} //for some reason it needs these properties
                >
                  <Avatar size="large" source={{ uri: list.coverArt }} />
                  <ListItem.Content>
                    <Text style={styles.title}>{list.name}</Text>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemeProvider>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  create: {
    marginTop: 20,
    height: 50,
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
