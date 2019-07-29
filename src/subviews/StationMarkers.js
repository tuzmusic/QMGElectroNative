// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Station from "../models/Station";
import React, { Component } from "react";
import { View, Button, Text, Platform, TextInput } from "react-native";
import { BLText } from "../components/StyledComponents";
import { connect } from "react-redux";
import { setCurrentStationID } from "../redux/actions/stationActions";
import pluralize from "pluralize";
import MapView, { Marker, Callout } from "react-native-maps";

type Props = {
  stations: { [key: string]: Station },
  onMarkerPress: () => void,
  onCalloutPress: Station => void,
  location: Location
};
const CellTextRow = props => (
  <BLText style={[{ padding: 0.5 }, props.style]}>{props.children}</BLText>
);

const StationMarkers = (props: Props) => {
  return Object.keys(props.stations).map<Marker>((key: string) => {
    const station = props.stations[key];
    const distanceString =
      pluralize(
        "mile",
        station.distanceFromLocation(props.location) || 0,
        true
      ) + " away";
    return (
      station.location && (
        <Marker
          coordinate={station.location}
          key={key}
          // onPress={props.onMarkerPress.bind(null, station)}
        >
          <Callout
            onPress={props.onCalloutPress.bind(null, station)}
            style={styles.callout}
          >
            <CellTextRow style={text.title}>{station.title}</CellTextRow>
            <CellTextRow style={text.distance}>{distanceString}</CellTextRow>
            <CellTextRow style={text.price}>
              {station.priceString()}
            </CellTextRow>
          </Callout>
        </Marker>
      )
    );
  });
};

export default connect(({ location }) => ({
  location: location.currentRegion
}))(StationMarkers);

const baseSize = 15;
const text = {
  title: {
    fontWeight: "bold",
    fontSize: baseSize + 1
  },
  address: {
    fontSize: baseSize
  },
  distance: {
    fontSize: baseSize
  },
  caption: {
    textAlign: "center"
  },
  price: {
    fontSize: baseSize,
    color: "green"
  }
};

const styles = {
  callout: {
    maxWidth: 250
  },
  rightSection: {
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  leftSection: {},
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
    flex: 2,
    padding: 7
  }
};
