import React, { Component } from "react";
import { Text, View, Linking, TouchableOpacity, FlatList } from "react-native";
import { Overlay } from "react-native-elements";
import * as LauncherConstants from "./constants";

const MapApps = [
  {
    name: "Apple Maps",
    slug: "maps",
    url(loc, label) {
      const latLng = `${loc.latitude},${loc.longitude}`;
      return `maps:0,0?q=${latLng}(${label})`;
    }
  },
  {
    name: "Google Maps",
    slug: "googlemaps",
    url(loc, label) {
      const prefix = "https://www.google.com/maps/search/?api=1&";
      return prefix + `query=${loc.latitude},${loc.longitude}`;
    }
  },
  {
    name: "Waze",
    slug: "waze",
    url(loc, label) {
      const prefix = "https://waze.com/ul?";
      return prefix + `ll=${loc.latitude},${loc.longitude}`;
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
  const component = (
    <TouchableOpacity
      style={styles.opacityContainer}
      onPress={() =>
        Linking.openURL(app.url(station.location, station.title)).catch(err => {
          console.warn(err);
          errorHandler(err);
        })
      }
    >
      <Text>Open In {app.name}</Text>
      <Text>{app.url(station.location, station.title)}</Text>
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
