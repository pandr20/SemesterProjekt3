import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Setting_Info } from "../../components/Setting_Info";
import { View, Text } from "../../components/Themed";
import { AuthContext } from "../../context";

export default function EditScreenInfo({ path }: { path: string }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Setting_Info
          title={"Gapless"}
          description={"Allows gapless playback."}
        />
      </View>
      <View style={styles.getStartedContainer}>
        <Setting_Info
          title={"Normalize volume"}
          description={"Set the same volume level for all tracks."}
        />
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            signOut();
          }}
        >
          <Text
            style={{
              color: "#D6CD81",
              fontSize: 18,
              fontFamily: "WorkSans-Bold",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {},
  loginBtn: {
    width: "26%",
    backgroundColor: "transparent",
    borderRadius: 6,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#D6CD81",
  },
  signOutContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
