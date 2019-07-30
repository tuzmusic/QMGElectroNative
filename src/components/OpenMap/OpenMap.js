import React, { Component } from "react";
import { Text, View, Linking, TouchableOpacity } from "react-native";
import * as LauncherConstants from "./constants";

export default class OpenMap extends Component {
  render() {
    // debugger;
    const arr = Object.values(LauncherConstants.APP).map(async str => {
      const canOpen = await Linking.canOpenURL(str);
      const s = `${str}: ${canOpen}`;
      console.log(s);
      return s;
    });
    // console.log(arr);

    return (
      <View style={styles.container}>
        <Text>Hi there</Text>
        {links()}
      </View>
    );
  }
}

const links = () => {
  const qpref = ":0,0?q=";
  const linksArray = [];
  const appList = LauncherConstants.APP;
  const apps = [appList.APPLE_MAPS, appList.GOOGLE_MAPS, appList.WAZE];
  for (str of apps) {
    const pref = str + qpref;
    let canOpen;
    console.log(pref);
    const component = (
      <TouchableOpacity
        style={styles.opacityContainer}
        onPress={() => Linking.openURL(pref)}
      >
        <Text key={str}>Open In {str}</Text>
      </TouchableOpacity>
    );
    linksArray.push(component);
  }
  return linksArray;
};

const styles = {
  container: { flex: 1, justifyContent: "center", alignItems: "flex-start" },
  opacityContainer: {
    padding: 4,
    margin: 5,
    borderBottomWidth: 0.5,
    width: "95%"
  }
};
