import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  VirtualizedList,
  SectionList,
  FlatList,
} from "react-native";
import { View, Text } from "../../components/Themed";
import { useEffect, useState } from "react";
import { DisplayAnImage } from "../../components/DisplayAnImage";
import { TopTracksImages } from "../../components/TopTracksImages";

import { ArtistAlbumPic } from "../../components/ArtistAlbumPic";
import axios from "axios";
import { TitleText } from "../../components/StyledText";
import { Layout } from "../../components/Layout";
import { ArtistJSON, AlbumJSON, SongJSON } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, SearchBar, ThemeProvider } from "react-native-elements";
import { SongList } from "../../components/SongList";
import { AlbumList } from "../../components/AlbumList";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { Album } from "../../components/Album";
import { SearchItem } from "../../components/SearchItem";
import { ArtistList } from "../../components/ArtistList";

export default function TabTwoScreen() {
  const [search, updateSearch] = useState<String>();
  const [data, setData] = useState<SongJSON[]>([]);
  const [album, setAlbum] = useState<AlbumJSON[]>([]);
  const [artist, setArtist] = useState<ArtistJSON[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  /**
   * @param value is automatically parsed when using the @method onChangeText
   * this @param value is then used as the search query
   */
  function getResults(value: string) {
    //console.log(value);
    if (value == "") {
      //console.log("I was cleared");
      updateSearch(value);
    } else {
      // console.log("I was called");
      getSearchResult(value);
      getSearchResultAlbum(value);
      getSearchResultArtist(value);
      updateSearch(value);
    }
  }
  /**
   *
   * @param value is the value parsed from the @function getResults
   * This value is then used to call on the search API, which returns a list of songs/albums/artists.
   */
  const getSearchResult = (value: string) => {
    axios
      .get("https://express-server-react-native.herokuapp.com/search/" + value)
      .then((res) => {
        setLoading(false);
        setData(res.data.result);
      })
      .catch((error) => console.log(error));
  };

  const getSearchResultAlbum = (value: string) => {
    axios
      .get(
        "https://express-server-react-native.herokuapp.com/searchAlbums/" +
          value
      )
      .then((res) => {
        setLoading(false);
        setAlbum(res.data.result);
      })
      .catch((error) => console.log(error));
  };

  const getSearchResultArtist = (value: string) => {
    axios
      .get(
        "https://express-server-react-native.herokuapp.com/searchArtists/" +
          value
      )
      .then((res) => {
        setLoading(false);
        setArtist(res.data.result);
      })
      .catch((error) => console.log(error));
  };

  const platform = {
    plat: {
      ...Platform.select({
        android: {
          text: "android",
        },
        ios: {
          text: "ios",
        },
        default: {
          text: "default",
        },
      }),
    },
  };

  return (
    <View style={styles.container}>
      <Layout>
        <SearchBar
          placeholder="Artists, songs or albums"
          //@ts-ignore
          onChangeText={getResults}
          //@ts-ignore
          value={search}
          //@ts-ignore
          onClear={getResults}
          //@ts-ignore
          platform={platform.plat.text}
        />
        <View style={styles.whitespace}></View>
        <ScrollView>
          <ArtistList data={artist} />
          <SongList data={data} />
          <AlbumList data={album} />
        </ScrollView>
      </Layout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  whitespace: {
    marginVertical: 4,
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
