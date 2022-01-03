import * as React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { DisplayAnImage } from "../../components/DisplayAnImage";
import { TopTracksImages } from "../../components/TopTracksImages";

import { ArtistAlbumPic } from "../../components/ArtistAlbumPic";
import axios from "axios";
import { TitleText } from "../../components/StyledText";
import { Layout } from "../../components/Layout";
import { ArtistJSON, AlbumJSON, SongJSON } from "../../types";

export default function TabTwoScreen() {
  const [search, updateSearch] = useState<String>("");
  const [artist, setArtist] = useState<ArtistJSON[]>([]);
  const [artistSongs, setArtistSongs] = useState<SongJSON[]>([]);
  const [albums, setAlbums] = useState<AlbumJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getArtists = () => {
    axios
      .get("https://express-server-react-native.herokuapp.com/artists")
      .then((res) => {
        setLoading(false);
        setArtist(res.data.artists);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getArtists();
  }, []);

  const getArtistSongs = () => {
    axios
      .get("https://express-server-react-native.herokuapp.com/artistSongs")
      .then((res) => {
        setLoading(false);
        setArtistSongs(res.data.artistSongs);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getArtistSongs();
  }, []);

  const getAlbums = () => {
    axios
      .get("https://express-server-react-native.herokuapp.com/albums") //https://express-server-react-native.herokuapp.com/albums
      .then((res) => {
        setLoading(false);
        setAlbums(res.data.albums);
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
              <ArtistAlbumPic
                imgUrl={artist[0]?.imgUrl}
                name={artist[0]?.name}
              />
            </View>
          </View>
          <View>
            <TitleText>Top Tracks</TitleText>
            {artistSongs.slice(0, 3).map((list) => (
              <View style={styles.imageView}>
                <TopTracksImages
                  imgUrl={list.imgUrl}
                  songName={list.songName}
                  album={list.album}
                />
              </View>
            ))}
          </View>
          <View>
            <TitleText>Albums</TitleText>
            <ScrollView horizontal={true}>
              <View style={styles.albumContainer}>
                <View style={{ flexDirection: "row" }}>
                  {albums.slice(0, 3).map((list) => (
                    <TouchableOpacity style={styles.albums}>
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
  imageView: {
    alignSelf: "flex-start",
    marginHorizontal: 2,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  albums: {
    marginRight: 17,
  },
});
