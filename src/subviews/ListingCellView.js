// @flow
import type Station from "../models/Station";
import type { Location } from "../redux/LocationTypes";
import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

const CellTextRow = props => (
  <BLText style={[{ padding: 1 }, props.style]}>{props.children}</BLText>
);

type Props = {
  station: Station,
  onTextPress: () => mixed,
  location: Location,
  containerStyle: { [key: string]: {} }
};

class ListingCellView extends Component<Props> {
  render() {
    const station = this.props.station;
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={this.props.onTextPress}
      >
        <View style={styles.leftSection}>
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          <CellTextRow style={text.address}>{station.address}</CellTextRow>
        </View>
        <View style={styles.rightSection}>
          {this.props.location && (
            <CellTextRow style={text.distance}>
              {station.distanceFromLocation(this.props.location) || "?"} mi.
            </CellTextRow>
          )}
          <CellTextRow style={text.price}>{station.priceString()}</CellTextRow>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(({ location }) => ({
  location: location.currentRegion
}))(ListingCellView);

const baseSize = 14;
const text = {
  title: {
    fontWeight: "bold",
    fontSize: baseSize + 2
  },
  address: {
    fontSize: baseSize
  },
  distance: {
    fontSize: baseSize,
    textAlign: "right"
  },
  caption: {
    textAlign: "center"
  },
  price: {
    fontSize: baseSize,
    color: "green",
    textAlign: "right"
  }
};

const styles = {
  rightSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  leftSection: { flex: 4 },
  cellContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  }
};
