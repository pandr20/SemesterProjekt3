import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";

type Props = {
  imgUrl: string;
  name: string;
};

export const ArtistAlbumPic: React.FC<Props> = ({ name, imgUrl }) => {
  const [checked, setChecked] = useState(false);
  const likeArtist = () => {
    setChecked(!checked)
  }
  return (
    <View>
      <ImageBackground style={styles.logo} source={{ uri: imgUrl }}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity style={styles.icon} onPress={likeArtist}
        >
          <MaterialCommunityIcons
            name={checked ? "heart" : "heart-outline"}
            size={30}
            color="#D6CD81"
          />
          </TouchableOpacity>
        <Text style={styles.favouriteText}>Favorite</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    bottom: 75,
    color: "#D6CD81",
  },
  favouriteText: {
    fontSize: 15,
    alignSelf: "center",
    color: "white",
    position: "absolute",
    bottom: 15,
  },
  logo: {
    width: 400,
    height: 260,
    resizeMode: "cover",
    marginBottom: 10,
  },
  imageView: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
  
    alignSelf: "center",
    paddingTop: 15,
    position: "absolute",
    bottom: 35,
  }
});
