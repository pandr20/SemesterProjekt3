import React, { useState } from "react";
import { Switch} from "react-native-elements";
import { View, StyleSheet } from "react-native";

type SwitchComponentProps = {};

const SwitchComponent: React.FunctionComponent<SwitchComponentProps> = () => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const theme = {
    colors: {
      primary: "white",
      secondary: "white",
      background: "red",
    },
  };

  return (
    <View style={styles.view}>
      <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
        color="#D6CD81"
        trackColor={{ true: "#D6CD81", false: "grey" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default SwitchComponent;
