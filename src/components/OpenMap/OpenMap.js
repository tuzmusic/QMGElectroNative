import React, { Component } from "react";
import { Text, View, Linking, TouchableOpacity, FlatList } from "react-native";
import { Overlay } from "react-native-elements";
import * as LauncherConstants from "./constants";

const MapApps = [
  {
    name: "Apple Maps",
    slug: "maps",
    scheme(loc, label, slug = "maps") {
      const scheme = slug + ":0,0?q=";
      const latLng = `${loc.latitude},${loc.longitude}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      return url;
    }
  },
  {
    name: "Google Maps",
    slug: "googlemaps",
    scheme(loc, label, slug = "googlemaps") {
      const scheme = slug + ":0,0?q=";
      const latLng = `${loc.latitude},${loc.longitude}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      return url;
    }
  },
  {
    name: "Waze",
    slug: "waze",
    scheme(loc, label, slug = "waze") {
      const scheme = slug + ":0,0?q=";
      const latLng = `${loc.latitude},${loc.longitude}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      return url;
    }
  }
];

export default class OpenMap extends Component {
  state = { error: "" };
  errorHandler = error => this.setState({ error });

  render() {
    return (
      <Overlay isVisible={true} style={styles.container}>
        <View>
          <FlatList
            data={MapApps}
            renderItem={({ item }) => (
              <MapLink
                key={item.slug}
                station={this.props.station}
                app={item}
                // keyExtractor={item => item.slug}
                errorHandler={this.errorHandler.bind(this)}
              />
            )}
          />
        </View>
        <Text>{this.state.error.message}</Text>
      </Overlay>
    );
  }
}

const MapLink = ({ station, app, errorHandler }) => {
  let scheme, label;
  scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  scheme = app + ":0,0?q=";
  label = station.title;
  // label = "Label";
  const latLng = `${station.location.latitude},${station.location.longitude}`;
  let url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });

  // debugger;
  const component = (
    <TouchableOpacity
      style={styles.opacityContainer}
      onPress={() =>
        Linking.openURL(app.scheme(station.location, station.title)).catch(
          err => {
            console.warn(err);
            errorHandler(err);
          }
        )
      }
    >
      <Text key={app.slug}>Open In {app.name}</Text>
    </TouchableOpacity>
  );
  return component;
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
