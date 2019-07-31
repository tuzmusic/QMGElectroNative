import React, { Component } from "react";
import { Text, View, Linking, TouchableOpacity, FlatList } from "react-native";
import { Overlay } from "react-native-elements";
import * as LauncherConstants from "./constants";

const MapApps = {
  apple: {
    name: "Apple Maps",
    url(loc, label) {
      const latLng = `${loc.latitude},${loc.longitude}`;
      return `maps:0,0?q=${latLng}(${label})`;
    }
  },
  google: {
    name: "Google Maps",
    url(loc, label) {
      const prefix = "https://www.google.com/maps/search/?api=1&";
      return prefix + `query=${loc.latitude},${loc.longitude}`;
    }
  },
  waze: {
    name: "Waze",
    url(loc, label) {
      const prefix = "https://waze.com/ul?";
      return prefix + `ll=${loc.latitude},${loc.longitude}`;
    }
  }
};
export default class OpenMap extends Component {
  state = { error: "" };
  errorHandler = error => this.setState({ error });

  render() {
    return (
      <Overlay isVisible={true} style={styles.container}>
        <FlatList
          data={Object.entries(MapApps)}
          renderItem={({ item }) => {
            // debugger;
            return (
              <MapLink
                key={item[0]}
                station={this.props.station}
                app={item[1]}
                // keyExtractor={item => item[0]}
                errorHandler={this.errorHandler.bind(this)}
              />
            );
          }}
        />
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
