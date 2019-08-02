// @flow
import type Station from "../models/Station";
import type { Location } from "../redux/LocationTypes";
import React from "react";
import { FlatList, View, Text } from "react-native";
import ListingCellView from "../subviews/ListingCellView";

type Props = {
  stations: Station[],
  navigation: Object,
  onTextPress: (item: Station) => mixed
};

const StationsList = (props: Props) => {
  return (
    <FlatList
      data={props.stations}
      renderItem={({ item }) => (
        <ListingCellView
          station={item}
          navigation={props.navigation}
          onTextPress={() => props.onTextPress(item)}
        />
      )}
      style={{ marginLeft: 5, marginRight: 5 }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default StationsList;
