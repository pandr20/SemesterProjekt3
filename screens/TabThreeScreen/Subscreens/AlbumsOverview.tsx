import * as React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import { MonoText } from "../../../components/StyledText";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../../components/Themed";
import { ListItem, Avatar, ThemeProvider, colors } from "react-native-elements";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../../components/Layout";
import { AlbumJSON } from "../../../types";
import { AlbumList } from "../../../components/AlbumList";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

export default function AlbumsScreen({ navigation }: any) {
  const [data, setData] = useState<AlbumJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getAlbums = async () => {
    try {
      axios
        .get("http://express-server-react-native.herokuapp.com/albums")
        .then((res) => {
          setData(res.data.albums);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <Layout>
      <AlbumList data={data} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
