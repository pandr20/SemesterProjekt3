import * as React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

type Props = {
  textButton: string;
  icon?: string;
  onPrees?: any;
};

export const FlatButton: React.FC<Props> = ({ textButton, icon, onPrees }) => {
  return (
    <TouchableOpacity onPress={onPrees} style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.buttonIcon}>
          {icon}
          <Text style={styles.buttonText}> {textButton} </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "white",
    borderRadius: 9,
    borderWidth: 1,
    width: "25%",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: "white",
  },
  buttonIcon: {
    color: "#D6CD81",
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    width: "100%",
  },
});
