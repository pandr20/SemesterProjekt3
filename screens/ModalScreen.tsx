import * as React from "react";
import { StyleSheet } from "react-native";
import { Profile } from "../components/Profile";
import { View } from "../components/Themed";
import SettingsScreen from "./GlobalScreens/SettingsScreen";

export default function ModalScreen() {
  return (
    <View>
      <Profile
        //imgUrl={"../../assets/images/best_profile.jpg"}
        imgUrl={"../assets/images/best_profile.jpg"}
        name={"Lars Larsen"}
        email={"larslarsen@gmail.com"}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <SettingsScreen path="/screens/ModalScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
});
