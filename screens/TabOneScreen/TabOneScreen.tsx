import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RootTabScreenProps } from "../../types";
import { TitleText } from "../../components/StyledText";
import { DisplayAnImage } from "../../components/DisplayAnImage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { AdvertismentBanner } from "../../components/AdvertismentBanner";
import colors from "../../assets/colors";

type image = {
  text: string;
  uri: string;
};

type dataJson = {
  id: number;
  title: string;
  horizontal: boolean;
  data: image[];
};

//Rendering image and text. Basic usage is to display rows of information.
const ListItem = ({ item }: { item: any }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <DisplayAnImage title={item.text} imgUrl={item.uri} />
      </TouchableOpacity>
    </View>
  );
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [data, setData] = useState<dataJson[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);

  const getHomescreenData = () => {
    axios("https://express-server-react-native.herokuapp.com/homescreen")
      .then((response) => setData(response.data.homescreen))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getHomescreenData();
  }, []);

  return (
    <Layout>
      <StatusBar style="auto" />
      <AdvertismentBanner />
      {/* Immediately Invoked Function Expression (IIFE) is used to call isLoading this is used to return
      different views/elements depending on the state of isLoading */}
      {(() => {
        if (isLoading) {
          return (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={colors.primary}
            />
          );
        }
        return (
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 5 }}
            stickySectionHeadersEnabled={false}
            // The actual data to render, comes from useState
            sections={data}
            keyExtractor={(item, index) => index.toString()}
            // null becuase renderItem is set inside renderSectionHeader in the FlatList
            renderItem={({}) => null}
            renderSectionHeader={({ section: group }) => (
              // Fragments (<>...</>) groups lists of children without adding extra nodes to the DOM.
              <>
                <TitleText>{group.title}</TitleText>
                <FlatList
                  horizontal={group.horizontal}
                  // The actual data to render
                  data={group.data}
                  // Takes an item from data and renders it into the list
                  renderItem={({ item }) => <ListItem item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
            )}
          />
        );
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
  loading: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
