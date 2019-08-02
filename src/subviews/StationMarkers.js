// @flow
import type { Location } from "../redux/LocationTypes";
import type Station from "../models/Station";
import React, { Component } from "react";
import StationMarker from "./StationMarker";
import { Marker } from "react-native-maps";
type Props = {
  stations: { [string]: Station },
  onMarkerPress: () => void,
  onCalloutPress: Station => void
};

const StationMarkers = (props: Props) => {
  return Object.keys(props.stations).map<Marker>((key: string) => {
    const station = props.stations[key];
    if (station.location)
      return (
        <StationMarker
          station={station}
          key={key}
          onCalloutPress={props.onCalloutPress}
        />
      );
  });
};

export default StationMarkers;
