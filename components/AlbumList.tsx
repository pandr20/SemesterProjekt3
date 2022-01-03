import * as React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Song } from "./Song";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { AlbumJSON, SongJSON } from "../types";
import { Avatar, colors, ListItem } from "react-native-elements";
import { Album } from "./Album";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  data: AlbumJSON[];
};

export const AlbumList: React.FC<Props> = ({ data }) => {
  const navigation: any = useNavigation();
  return (
    <ScrollView>
      {data.map((list, i) => (
        <TouchableOpacity
          key={i * 9834}
          onPress={() =>
            navigation.navigate("AlbumScreen", {
              albumName: list.name,
              albumArtist: list.artist_id,
              albumCoverArt: list.coverArt,
              albumSongs: list.songs,
            })
          }
        >
          <Album
            _id={list.id}
            coverArt={list.coverArt}
            songs={list.songs}
            name={list.name}
            artist={list.artist_id}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
    /*
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
          <Album
            _id={item.id}
            coverArt={item.coverArt}
            songs={item.songs}
            name={item.name}
            artist={item.artist_id}
          />
        </TouchableOpacity>
      )}
      //@ts-ignore
      keyExtractor={(item, index) => index}
    /> */
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
