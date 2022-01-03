import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "../components/Themed";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { ArtistJSON } from "../types";

type Props = {
  _id: string;
  artwork?: string;
  songUrl: string;
  title: string;
  artist: ArtistJSON[];
};

export const Song: React.FC<Props> = ({
  _id,
  artwork,
  songUrl,
  title,
  artist,
}) => {
  const navigation: any = useNavigation();

  if (artwork) {
    return (
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
    );
  } else {
    return (
      <View>
        <View style={styles.container2}>
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
    );
  }
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
