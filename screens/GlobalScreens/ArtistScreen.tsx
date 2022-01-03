import * as React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { View, Text } from "../../components/Themed";
import { useEffect, useState } from "react";
import { DisplayAnImage } from "../../components/DisplayAnImage";
import { TopTracksImages } from "../../components/TopTracksImages";

import { ArtistAlbumPic } from "../../components/ArtistAlbumPic";
import axios from "axios";
import { TitleText } from "../../components/StyledText";
import { Layout } from "../../components/Layout";
import { ArtistJSON, AlbumJSON, SongJSON } from "../../types";
import { SongList } from "../../components/SongList";
import { Song } from "../../components/Song";
import { Album } from "../../components/Album";

export default function TabTwoScreen({ route, navigation }: any) {
  const [search, updateSearch] = useState<String>("");
  const [artistSongs, setArtistSongs] = useState<SongJSON[]>([]);
  const [albums, setAlbums] = useState<AlbumJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { artistId, artistName, artistImage } = route.params;

  const getArtistSongs = () => {
    axios
      //.get("https://express-server-react-native.herokuapp.com/artistSongs")
      .get(
        "https://express-server-react-native.herokuapp.com/artist/songs/" +
          artistId
      ) //618e5329ae723fcdbcd6f5b8
      .then((res) => {
        setLoading(false);
        setArtistSongs(res.data.result);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getArtistSongs();
  }, []);

  const getAlbums = () => {
    axios
      .get(
        "https://express-server-react-native.herokuapp.com/artist/albums/" +
          artistId
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
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.viewFormat}>
              <ArtistAlbumPic imgUrl={artistImage} name={artistName} />
            </View>
          </View>
          <View>
            <TitleText>Top Tracks</TitleText>
            {artistSongs.slice(0, 3).map((list, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("MediaPlayer", {
                    playlist: artistSongs,
                    song: artistSongs[index],
                    index,
                  })
                }
              >
                <Song
                  _id={list._id}
                  artwork={list.albumCoverUrl}
                  title={list.name}
                  artist={list.artist_id}
                  songUrl={""}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <TitleText>Albums</TitleText>
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
                      <DisplayAnImage
                        imgUrl={list.coverArt}
                        title={list.name}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
          {/* The whitespace is only there for now so it's possible to scroll on the page*/}
          <View style={styles.whitespace}>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  albumContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewFormat: {
    alignSelf: "center",
  },

  albums: {
    marginRight: 17,
  },
  whitespace: {
    marginTop: 100,
  },
});
