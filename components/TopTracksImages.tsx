import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";

type Props = {
  imgUrl: string;
  songName: string;
  album: string;
  onPress?: any;
};

export const TopTracksImages: React.FC<Props> = ({
  songName,
  imgUrl,
  album,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={styles.imageView}>
           <Image style={styles.logo} source={{ uri: imgUrl }}></Image>
          <View>
                     <View>
              <Text style={styles.songName}>{songName}</Text>
            </View>
            <View>
              <Text style={styles.albumName}>{album}</Text>
            </View>  
          </View>
        </View>
      </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songName: {
    fontSize: 22,
    color: "white",
  },
  albumName: {
    fontSize: 18,
    color: "white",
  },
  logo: {
    width: 90,
    height: 45,
    resizeMode: "cover",
    marginRight: 10,
  },
  imageView: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
