import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { PlayerWidget } from "./PlayerWidget";
import {usePlaybackState, State} from "react-native-track-player";

/*
All screens that needs the mini player displayed must be wrapped in this Layout component.
*/

export const Layout: FC = ({children}) => {
  const playbackState = usePlaybackState();
  const shouldDisplayPlayer = playbackState === State.Playing || playbackState === State.Paused; 
  return (
    <SafeAreaView style={styles.container}>
      {children}
      {shouldDisplayPlayer && <PlayerWidget />}
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container: {
    width: "100%", 
    height: "100%"
  }
})