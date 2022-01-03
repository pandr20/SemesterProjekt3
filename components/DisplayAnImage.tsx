import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text } from "./Themed";

type Props = {
  imgUrl: string;
  title?: string;
};

export const DisplayAnImage: React.FC<Props> = ({ title, imgUrl }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: imgUrl }} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  text: {
    fontSize: 20,
    width: 150,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  imageView: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
