import * as React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Text, View } from "../../../components/Themed";
import { ListItem, Avatar, ThemeProvider, colors } from "react-native-elements";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../../components/Layout";
import { PlaylistJSON } from "../../../types";
import AsyncStorage from "@react-native-community/async-storage";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default function CreatePlaylistScreen({ navigation }: any) {
  const [playlistName, setPlaylistName] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [isLoading, setLoading] = useState<boolean>(true);

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
  //@ts-ignore
  useEffect(async () => {
    //@ts-ignore
    setUserID(await fetchToken());
  }, []);

  async function createPlaylist(pName: string, user: string) {
    await axios.post(
      "https://express-server-react-native.herokuapp.com/playlist/addplaylist",
      {
        name: pName,
        user_id: user,
        songs: [],
      }
    );
    navigation.navigate("TabThree");
  }
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Text
            style={{
              height: 50,
              fontSize: 22,
              fontFamily: "WorkSans-Regular",
              alignSelf: "center",
            }}
          >
            Give your playlist a name:
          </Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder=""
              style={styles.inputText}
              onChangeText={setPlaylistName}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => createPlaylist(playlistName, userID)}
          >
            <Text
              style={{
                color: "#D6CD81",
                fontSize: 20,
                fontFamily: "WorkSans-Bold",
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </ThemeProvider>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  logo: {
    resizeMode: "cover",
    margin: 30,
    height: 120,
    width: 120,
  },
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  inputText: {
    height: 50,
    fontSize: 30,
    color: "black",
    fontFamily: "WorkSans-Regular",
  },
  loginBtn: {
    width: "26%",
    backgroundColor: "transparent",
    borderRadius: 6,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#D6CD81",
  },
});
