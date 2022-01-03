import * as React from "react";
import { Text, View } from "./Themed";
import { StyleSheet, Image } from "react-native";
import colors from "../assets/colors";

type Props = {
  coverArt: string;
  groupName: string;
  artistName?: string;
};

export const ContentHeader: React.FC<Props> = ({
  groupName,
  coverArt,
  artistName,
}) => {
  return (
    <View>
      <Image style={styles.images} source={{ uri: coverArt }} />
      <Text style={styles.text}>{groupName}</Text>

      {artistName != null ? (
        <Text style={styles.albumName}>{artistName}</Text>
      ) : null}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    marginTop: 20,
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
  },
  albumName: {
    fontSize: 16,
    alignSelf: "center",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
});
