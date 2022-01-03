import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DisplayAnImage } from "../../components/DisplayAnImage";
import { Text, View } from "../../components/Themed";
import { TitleText } from "../../components/StyledText";
import { Layout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { ArtistJSON, AlbumJSON, SongJSON } from "../../types";
import axios from "axios";

export default function TabThreeScreen({ navigation }: any) {
  const [albums, setAlbums] = useState<AlbumJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getAlbums = () => {
    axios
      //static way to get albums from an artist. In theory it should be based on recently played
      .get(
        "https://express-server-react-native.herokuapp.com/artist/albums/" +
          "618e5329ae723fcdbcd6f5b8"
      )
      .then((res) => {
        setLoading(false);
        setAlbums(res.data.result);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <Layout>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("PlaylistsOverview")}
        >
          <View style={styles.imageView}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={35}
              color="#D6CD81"
              style={{ marginRight: 15 }}
            />
            <Text style={styles.text}>Playlists</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("AlbumsOverview")}
        >
          <View style={styles.imageView}>
            <MaterialCommunityIcons
              name="album"
              size={35}
              color="#D6CD81"
              style={{ marginRight: 15 }}
            />
            <Text style={styles.text}>Albums</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("SongsOverview")}
        >
          <View style={styles.imageView}>
            <MaterialCommunityIcons
              name="music-note"
              size={35}
              color="#D6CD81"
              style={{ marginRight: 15 }}
            />
            <Text style={styles.text}>Songs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("ArtistsOverview")}
        >
          <View style={styles.imageView}>
            <MaterialCommunityIcons
              name="microphone"
              size={35}
              color="#D6CD81"
              style={{ marginRight: 15 }}
            />
            <Text style={styles.text}>Artists</Text>
          </View>
        </TouchableOpacity>
        <View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <TitleText>Recently Played</TitleText>
          <ScrollView horizontal={true}>
            <View style={styles.albumContainer}>
              <View style={{ flexDirection: "row" }}>
                {albums.slice(0, 3).map((list, index) => (
                  <TouchableOpacity
                    style={styles.albums}
                    key={index}
                    onPress={() =>
                      navigation.navigate("AlbumScreen", {
                        albumName: list.name,
                        albumArtist: list.artist_id,
                        albumCoverArt: list.coverArt,
                        albumSongs: list.songs,
                      })
                    }
                  >
                    <DisplayAnImage imgUrl={list.coverArt} title={list.name} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    paddingTop: 15,
    height: "100%",
  },
  text: {
    fontSize: 20,
  },
  separator: {
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 30,
    height: 1,
    width: "90%",
  },
  imageView: {
    alignSelf: "flex-start",
    marginHorizontal: 2,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  albumContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  albums: {
    marginRight: 17,
  },
});
