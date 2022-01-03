import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { color } from "react-native-reanimated";
import TrackPlayer, {
  State,
  usePlaybackState,
  Track,
  TrackMetadataBase,
} from "react-native-track-player";
import {
  togglePlayback,
  useCurrentTrack,
} from "../screens/GlobalScreens/MediaPlayer";

export const PlayerWidget = () => {
  const playbackState = usePlaybackState();
  const currentTrack = useCurrentTrack();

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <Image
            style={styles.Image}
            source={{ uri: currentTrack?.artwork as string | undefined }}
          />
          <View style={[styles.flexContainer, { width: "70%" }]}>
            <Text
              numberOfLines={1}
              style={{ color: "#D6CD81", fontWeight: "bold", fontSize: 20 }}
            >
              {currentTrack?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: "#D6CD81", fontWeight: "bold" }}
            >
              {currentTrack?.artist}
            </Text>
          </View>
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row", margin: 3 }}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="heart-outline"
                size={40}
                style={styles.iconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
              <Ionicons
                name={
                  playbackState === State.Playing
                    ? "ios-pause-circle"
                    : "ios-play-circle"
                }
                size={40}
                style={styles.iconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
              <Ionicons
                name="md-play-skip-forward-sharp"
                size={40}
                style={styles.iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    padding: 1,
    bottom: 7,
    backgroundColor: "#706E6B",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "98%",
    borderRadius: 5,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
  },
  Image: {
    resizeMode: "cover",
    margin: 3,
    width: 45,
    height: 45,
  },
  iconColor: {
    color: "#D6CD81",
  },
});
