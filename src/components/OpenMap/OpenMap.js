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
  render() {
    return (
      <Overlay
        isVisible={true}
        height={"auto"}
        overlayStyle={styles.overlayStyle}
        onBackdropPress={this.props.onBackdropPress}
      >
        <View style={styles.container}>
          <FlatList
            data={Object.entries(MapApps)}
            renderItem={({ item }) => {
              return (
                <MapLink
                  key={item[0]}
                  keyExtractor={(item, ind) => ind}
                  station={this.props.station}
                  app={item[1]}
                />
              );
            }}
          />
        </View>
      </Overlay>
    );
  }
}

const MapLink = ({ station, app }) => {
  const component = (
    <TouchableOpacity
      style={styles.opacityContainer}
      onPress={() =>
        Linking.openURL(app.url(station.location, station.title)).catch(err => {
          console.warn(err);
        })
      }
    >
      <Text style={styles.text}>Open In {app.name}</Text>
    </TouchableOpacity>
  );
  return component;
};

const styles = {
  text: { fontSize: 16 },
  opacityContainer: {
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    height: 50
  },
  overlayStyle: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
    margin: 0,
    borderRadius: 8
  }
};
