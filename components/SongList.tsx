import * as React from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Song } from "./Song";
import { useNavigation } from "@react-navigation/native";
import { SongJSON } from "../types";

type Props = {
  data: SongJSON[];
};

export const SongList: React.FC<Props> = ({ data }) => {
  const navigation: any = useNavigation();
  return (
    <ScrollView>
      {data.map((list, index) => (
        <TouchableOpacity
          key={index * 9834}
          onPress={() =>
            navigation.navigate("MediaPlayer", {
              playlist: data,
              song: list,
              index,
            })
          }
        >
          <Song
            _id={list._id}
            artwork={list.albumCoverUrl}
            title={list.name}
            songUrl={list.songUrl}
            artist={list.artist_id}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
    /*
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MediaPlayer", {
              playlist: data,
              song: item,
              index,
            })
          }
        >
          <Song
            _id={item._id}
            artwork={item.albumCoverUrl}
            title={item.name}
            songUrl={item.songUrl}
            artist={item.artist_id}
          />
        </TouchableOpacity>
      )}
      //@ts-ignore
      keyExtractor={(item, index) => index}
    />
    */
  );
};
