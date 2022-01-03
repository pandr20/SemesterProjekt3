import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AdAPI from "../API/AdAPI";
import IAdAPI from "../API/IAdAPI";
import colors from "../assets/colors";

export const AdvertismentBanner = ({}) => {
  const adAPI: IAdAPI = AdAPI.getInstance();

  // useStates
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [adImageUrl, setAdImageUrl] = useState<string>();

  const getAd = () => {
    // why not write -> AdAPI.getInstance()
    adAPI
      // Calls method from AdAPI class
      .getVisualAd()
      .then((response) => setAdImageUrl(response))
      .catch((error) => {
        // Set default image when request fails
        console.log(error);
        //setAdImageUrl("https://www.absolut-venezuela.com/wp-content/uploads/2021/04/7.jpg");
        // setAdImageUrl(error) <-- This can be done by moving url to AdAPI catch(error) => ...
        setAdImageUrl(error);
      })
      .finally(() => setLoading(false));
  };

  //stop blicking, blicked because states updates component, enters a loop.
  // Only call getAd() if adImageUrl is not yet set
  //if (adImageUrl === undefined) {getAd();}

  useEffect(() => {
    getAd();
    // Calls getAd() at set interval
    setInterval(getAd, 30000);
  }, []);

  function openAdLink() {
    if (adImageUrl != undefined) {
      Linking.openURL(adImageUrl);
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colors.primary}
      />
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={openAdLink}>
        <Image
          style={styles.banner}
          source={{
            uri: adImageUrl,
          }}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  banner: {
    height: 90,
    resizeMode: "stretch",
  },
  loading: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
