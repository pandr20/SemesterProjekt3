import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { ContentHeader } from "../../components/ContentHeader";
import { SongList } from "../../components/SongList";
import { SongJSON } from "../../types";

export default function PlaylistScreen({ route, navigation }: any) {
  const [data, setData] = useState<SongJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { playlistName, playlistCoverArt, playlistSongs } = route.params;

  if (playlistSongs[0].artist_id.length == 0) {
    return (
      <Layout>
        <View style={styles.container}>
          <ContentHeader groupName={playlistName} coverArt={playlistCoverArt} />
          <Text style={styles.title}> No songs in the playlist </Text>
        </View>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <View style={styles.container}>
          <ContentHeader groupName={playlistName} coverArt={playlistCoverArt} />
          <SongList data={playlistSongs} />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
  container: {
    height: "100%",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
});
