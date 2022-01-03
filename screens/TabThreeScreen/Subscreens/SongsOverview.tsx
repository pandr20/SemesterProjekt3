import * as React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "../../../components/Layout";
import { Text, View } from "../../../components/Themed";

export default function PlaylistScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>
          Favorite some songs to have them displayed here!
        </Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
