import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";

type Props = {
  imgUrl: string;
  name: string;
  email: string;
};

export const Profile: React.FC<Props> = ({ imgUrl, name, email }) => {
  return (
    <View>
      <Image
        source={require("../assets/images/best_profile.jpg")}
        style={styles.images}
      />
      <View>
        <Text style={styles.BoldText}>{name}</Text>
        <Text style={styles.StandardText}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  images: {
    // width: 150,
    // height: 80,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: "center",
  },
  BoldText: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  StandardText: {
    fontSize: 15,
    alignSelf: "center",
  },
});
