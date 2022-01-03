import * as React from "react";
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import { View, Text } from "../../components/Themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  ListItem,
  Avatar,
  ThemeProvider,
  colors,
  Button,
  Overlay,
} from "react-native-elements";
import { BlackText } from "../../components/StyledText";
import { PlaylistJSON } from "../../types";

TrackPlayer.updateOptions({
  // Media controls capabilities
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],

  // Capabilities that will show up when the notification is in the compact form on Android
  compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
});

const { width, height } = Dimensions.get("window");

export const togglePlayback = async (state) => {
  if (state !== State.Playing) {
    await TrackPlayer.play();
  } else {
    await TrackPlayer.pause();
  }
};

export const useCurrentTrack = () => {
  const defaultTrack = {
    url: "",
  };
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);

  const getCurrentTrack = async () => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if (currentTrackIndex !== null) {
      const currentTrack = await TrackPlayer.getTrack(currentTrackIndex);
      return currentTrack;
    }
  };

  useEffect(() => {
    let mounted = true;
    getCurrentTrack().then((track) => {
      if (mounted) {
        setCurrentTrack(track);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return currentTrack;
};

const mapTracksForPlayer = (tracks) => {
  return tracks.map((track) => ({
    id: track._id,
    url: "https://express-server-react-native.herokuapp.com" + track.songUrl,
    artist: track.artist_id[0].name,
    title: track.name,
    artwork: track.albumCoverUrl,
  }));
};

export const MediaPlayer = ({ route, navigation }) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const songs = mapTracksForPlayer(route.params.playlist);
  const song = mapTracksForPlayer([route.params.song]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(route.params.index);
  const songSlider = useRef(songs);
  const [shuffle, setShuffle] = useState(false);
  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const setupPlayer = async (songs) => {
    try {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.reset();

      const preSong = songs.slice(0, route.params.index);
      const postSong = songs.slice(route.params.index + 1);
      await TrackPlayer.add(song);
      await TrackPlayer.play();
      await TrackPlayer.add(preSong, 0);
      await TrackPlayer.add(postSong, -1);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setupPlayer(songs);

    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
  };

  const skipToNext = () => {
    if (shuffle) {
      songSlider.current.scrollToOffset({
        offset:
          Math.floor(Math.random() * route.params.playlist.length) * width,
      });
    } else {
      if (songIndex == route.params.playlist.length - 1) {
        skipTo(0);
        songSlider.current.scrollToOffset({
          offset: 0,
        });
      } else {
        songSlider.current.scrollToOffset({
          offset: (songIndex + 1) * width,
        });
      }
    }
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [playlistData, setPlaylistData] = useState(PlaylistJSON);
  const [isLoading, setLoading] = useState(true);

  const fetchToken = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.log(error);
    }
    //@ts-ignore
    userToken = userToken.replace(/['"]+/g, "");
    return userToken;
  };

  const getPlaylists = async (token) => {
    try {
      axios
        .get(
          "http://express-server-react-native.herokuapp.com/playlists/" + token
        )
        .then((res) => {
          setPlaylistData(res.data.playlists);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //@ts-ignore
  useEffect(async () => {
    //@ts-ignore
    getPlaylists(await fetchToken());
  }, []);

  async function addSong(playlistID) {
    toggleOverlay();
    await axios.post(
      "http://express-server-react-native.herokuapp.com/playlist/addsong",
      {
        id: playlistID,
        songId: songs[songIndex].id,
      }
    );
  }

  const printerN = (playlistID) => {
    printet = songs[songIndex].id;
    console.log("songs: " + printet + "\n");
    console.log("playlistid: " + playlistID);
    toggleOverlay();
  };

  const renderPlaylists = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addSong(item._id);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <Text style={styles.overlayTitle}>{item.name}</Text>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSongs = ({ item }) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.artworkWrapper}>
          <Image
            source={{ uri: songs[songIndex]?.artwork }}
            style={styles.artworkImg}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          fullScreen={true}
        >
          <FlatList
            data={playlistData}
            renderItem={renderPlaylists}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          />
        </Overlay>
        <Animated.FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />

        <View style={styles.txtContainer}>
          <View>
            <Text style={styles.title}>{songs[songIndex]?.title}</Text>
            <Text style={styles.artist}>{songs[songIndex]?.artist}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="heart-outline"
                size={30}
                style={styles.iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressWrapper}>
          <Slider
            maximumTrackTintColor={"#DCDCDC"}
            style={styles.progressContainer}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#D6CD81"
            minimumTrackTintColor="#D6CD81"
            onSlidingComplete={async (value) => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelTxt}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
            <Text style={styles.progressLabelTxt}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
          </View>
        </View>

        <View style={styles.musicControlls}>
          <TouchableOpacity onPress={toggleShuffle}>
            <MaterialCommunityIcons
              name={shuffle ? "shuffle-variant" : "shuffle-disabled"}
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => skipToPrevious()}>
            <Ionicons
              name="md-play-skip-back-sharp"
              size={30}
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
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => skipToNext()}>
            <Ionicons
              name="md-play-skip-forward-sharp"
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name="repeat"
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContaier}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name="md-reorder-four-sharp"
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleOverlay();
            }}
          >
            <MaterialCommunityIcons
              name="playlist-plus"
              size={30}
              style={styles.iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0906",
    width: width,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  artworkWrapper: {
    marginBottom: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: "90%",
  },
  artworkImg: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  txtContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  artist: {
    fontSize: 14,
    fontWeight: "200",
    textAlign: "left",
  },
  progressWrapper: {
    width: "90%",
  },
  progressContainer: {
    height: 40,
    marginTop: 10,
    marginHorizontal: -15,
    flexDirection: "row",
  },
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelTxt: {},
  iconColor: {
    color: "#D6CD81",
  },
  musicControlls: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 15,
  },
  bottomContaier: {
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});
