import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "./Themed";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { ArtistJSON, SongJSON } from "../types";

type Props = {
  _id: string;
  imgUrl: string;
  name: string;
};

export const Artist: React.FC<Props> = ({ _id, imgUrl, name }) => {
  const navigation: any = useNavigation();

  return (
    <View>
      <View style={styles.container2}>
        <Image style={styles.logo} source={{ uri: imgUrl }} />
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.songText}>
            {name}
          </Text>
          <Text style={styles.artistText}>Artist</Text>
        </View>
      </View>
    </View>
  );
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

    borderRadius: 200 / 2,
  },
});
