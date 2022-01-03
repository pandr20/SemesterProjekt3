/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  Modal: undefined;
  PlaylistScreen: undefined;
  CreatePlaylistScreen: undefined;
  AlbumScreen: undefined;
  ArtistScreen: undefined;
  PlaylistsOverview: undefined;
  SongsOverview: undefined;
  ArtistsOverview: undefined;
  AlbumsOverview: undefined;
  MediaPlayer: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ArtistJSON = {
  _id: string;
  name: string;
  imgUrl: string;
};

export type SongJSON = {
  _id: string;
  name: string;
  artist_id: ArtistJSON[];
  genre: string;
  albumCoverUrl: string;
  songUrl: string;
};

export type AlbumJSON = {
  id: string;
  name: string;
  artist_id: ArtistJSON[];
  coverArt: string;
  songs: SongJSON[];
};

export type Playlist = {
  id: number;
  name: string;
  coverArt: string;
  songId: number[];
};

export type PlaylistJSON = {
  _id: string;
  name: string;
  coverArt: string;
  songs: SongJSON[];
};
