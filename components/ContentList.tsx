import * as React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Song } from "./Song";
import { Text, View } from "./Themed";
import { useNavigation } from "@react-navigation/native";
import { AlbumJSON, SongJSON } from "../types";
import { Avatar, colors, ListItem } from "react-native-elements";
import { Album } from "./Album";

type Props = {
  data: AlbumJSON[];
};

export const AlbumList: React.FC<Props> = ({ data }) => {
  const navigation: any = useNavigation();
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AlbumScreen", {
              albumName: item.name,
              albumArtist: item.artist_id,
              albumCoverArt: item.coverArt,
              albumSongs: item.songs,
            })
          }
        >
          <AlbumList data={data} />
        </TouchableOpacity>
      )}
      //@ts-ignore
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
