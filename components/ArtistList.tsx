import * as React from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { Song } from "./Song";
import { Text, View } from "./Themed";
import { useNavigation } from "@react-navigation/native";
import { AlbumJSON, ArtistJSON, SongJSON } from "../types";
import { Avatar, colors, ListItem } from "react-native-elements";
import { Album } from "./Album";
import { Artist } from "./Artist";

type Props = {
  data: ArtistJSON[];
};

export const ArtistList: React.FC<Props> = ({ data }) => {
  const navigation: any = useNavigation();
  return (
    <ScrollView>
      {data.map((list, i) => (
        <TouchableOpacity
          key={i * 9834}
          onPress={() =>
            navigation.navigate("ArtistScreen", {
              artistName: list.name,
              artistId: list._id,
              artistImage: list.imgUrl,
            })
          }
        >
          <Artist _id={list._id} imgUrl={list.imgUrl} name={list.name} />
        </TouchableOpacity>
      ))}
    </ScrollView>

    /*
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtistScreen", {
              artistId: item._id,
              artistName: item.name,
              artistImage: item.imgUrl,
            })
          }
        >
          <Artist _id={item._id} imgUrl={item.imgUrl} name={item.name} />
        </TouchableOpacity>
      )}
      //@ts-ignore
      keyExtractor={(item, index) => index}
    />*/
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
