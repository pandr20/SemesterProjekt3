import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../../components/Themed";
import { useState } from "react";
import { Layout } from "../../../components/Layout";
import { ContentHeader } from "../../../components/ContentHeader";
import { SongList } from "../../../components/SongList";
import { SongJSON } from "../../../types";


export default function PlaylistScreen({ route, navigation }: any) {
  const [data, setData] = useState<SongJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { albumName, albumArtist, albumCoverArt, albumSongs } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <ContentHeader
          coverArt={albumCoverArt}
          groupName={albumName}
          artistName={albumArtist[0].name}
        />
        <SongList data={albumSongs} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
