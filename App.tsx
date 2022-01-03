import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation, AuthNavigation } from "./navigation";
import { AuthContext } from "./context";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator } from "react-native";
import { View } from "./components/Themed";
import axios from "axios";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const initialLoginState: {
    isLoading: boolean;
    userName: null | string;
    userToken: null | string;
  } = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  type Action =
    | { type: "RETRIEVE_TOKEN"; token: string | null }
    | { type: "LOGIN"; id: string; token: string | null }
    | { type: "LOGOUT" };

  const testReducer = (prevState: typeof initialLoginState, action: Action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    testReducer,
    initialLoginState
  );

  const authContext: AuthContext = React.useMemo(
    () => ({
      signIn: async (username: string, password: string) => {
        let userToken: string | null = null;

        axios
          .post("https://express-server-react-native.herokuapp.com/login", {
            email: username,
            password: password,
          })
          .then(async function (response) {
            if (response.status === 200) {
              try {
                userToken = JSON.stringify(response.data);
                await AsyncStorage.setItem("userToken", userToken ?? "");
              } catch (error) {
                console.log(error);
              }
            }
            dispatch({ type: "LOGIN", id: username, token: userToken });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  const fetchToken = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
  };

  React.useEffect(() => {
    setTimeout(async () => {
      fetchToken();
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return loginState.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    ) : (
      <AuthContext.Provider value={authContext}>
        <SafeAreaProvider>
          {loginState.userToken !== null ? (
            <>
              <Navigation colorScheme={colorScheme} />
            </>
          ) : (
            <>
              <AuthNavigation colorScheme={colorScheme} />
            </>
          )}
          <StatusBar />
        </SafeAreaProvider>
      </AuthContext.Provider>
    );
  }
}
