import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { AuthContext } from "../../context";

export const LoginScreen = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/yfitops.png")}
      />
      <Text
        style={{
          height: 50,
          marginRight: 235,
          fontSize: 16,
          marginBottom: -25,
          fontFamily: "WorkSans-Regular",
        }}
      >
        Username:
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder=""
          style={styles.inputText}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <Text
        style={{
          height: 50,
          marginRight: 235,
          fontSize: 16,
          marginBottom: -25,
          fontFamily: "WorkSans-Regular",
        }}
      >
        Password:
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder=""
          secureTextEntry
          style={styles.inputText}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          signIn(username, password);
        }}
      >
        <Text
          style={{
            color: "#D6CD81",
            fontSize: 18,
            fontFamily: "WorkSans-Bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ fontSize: 14, fontFamily: "WorkSans-Bold" }}>
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  logo: {
    resizeMode: "contain",
    margin: 30,
    height: 250,
    width: 250,
  },
  /*logoTekst:{
        fontWeight:"bold", 
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },*/
  /*text:{
        color:"#003f5c",
        height: 60,
    },*/
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  inputText: {
    height: 50,
    fontSize: 16,
    color: "black",
    fontFamily: "WorkSans-Regular",
  },
  /*forgot:{
        color:"white",
        fontSize:11
    },*/
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
});
