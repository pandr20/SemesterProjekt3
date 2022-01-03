import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "../components/Themed";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { ArtistJSON, SongJSON } from "../types";

type Props = {
  _id: string;
  artwork?: string;
  songUrl: string;
  title: string;
  artist: ArtistJSON[];
  coverArt?: string;
  songs: SongJSON[];
  name: string;
};

export const SearchItem: React.FC<Props> = ({
  _id,
  artwork,
  songUrl,
  title,
  artist,
  coverArt,
  songs,
  name,
}) => {
  const navigation: any = useNavigation();

  if (artwork) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MediaPlayer", {
            song: songUrl,
            index: 0,
          })
        }
      >
        <View>
          <View style={styles.container2}>
            <Image style={styles.logo} source={{ uri: artwork }} />
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.songText}
              >
                {title}
              </Text>
              <Text style={styles.artistText}>{artist[0].name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (coverArt) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AlbumScreen", {
            albumName: name,
            albumArtist: artist,
            albumCoverArt: coverArt,
            albumSongs: songs,
          })
        }
      >
        <View>
          <View style={styles.container2}>
            <Image style={styles.logo} source={{ uri: coverArt }} />
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.songText}
              >
                {name}
              </Text>
              <Text style={styles.artistText}>Album • {artist[0].name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  songText: {
    paddingLeft: 5,
    fontSize: 24,
    width: 250,
    fontFamily: "WorkSans-SemiBold",
  },
  artistText: {
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "WorkSans-Medium",
  },
  container: {
    width: 100,
    height: 10,
    flexDirection: "row",
  },
  container2: {
    width: 600,
    height: 70,
    flexWrap: "nowrap",
    flexDirection: "row",
    textAlignVertical: "top",
    textAlign: "center",
  },

  logo: {
    width: 60,
    height: 60,
  },
});
