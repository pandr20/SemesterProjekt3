import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";
import SwitchComponent from "./SwitchComponent";

type Props = {
  title: string;
  description: string;
};

export const Setting_Info: React.FC<Props> = ({ title, description }) => {
  return (
    <View>
      <Text style={styles.BoldText}>{title}</Text>
      <View
        style={{
          paddingVertical: 2,
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {description}
        </Text>
        <SwitchComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BoldText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 5,
    paddingTop: 30,
  },
  StandardText: {
    fontSize: 15,
  },

  icon: {},
});
