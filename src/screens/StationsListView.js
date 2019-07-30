// @flow

import type Station from "../models/Station";
import type { Location } from "../redux/reducers/locationReducer";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import StationsList from "../subviews/StationsList";
import { setCurrentStationID } from "../redux/actions/stationActions";
import { setSearchRadius } from "../redux/actions/locationActions";
import pluralize from "pluralize";
import FilterInput from "../subviews/FilterInput";
import LoadingIndicator from "../components/LoadingIndicator";

type ListViewProps = {
  stations: Station[],
  navigation: { navigate: (string, { title: string }) => void },
  onTextPress: (item: Station) => void,
  isLoading: boolean,
  location: Location,
  searchRadius: number,
  setCurrentStationID: (number | string) => void,
  setSearchRadius: number => void
};

const EmptyStationList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        Sorry, there are no stations within the search area.
      </Text>
      <Text style={styles.emptyListText}>
        Try searching a different region, or expanding the search radius.
      </Text>
    </View>
  );
};

class StationsListView extends Component<ListViewProps> {
  static navigationOptions = () => ({
    headerTitle: "Stations"
  });

  componentDidMount() {
    setTimeout(() => {
      if (__DEV__ && this.props.stations.length)
        this.onStationClick(this.props.stations[0]);
    }, 2500);
  }

  onStationClick = (station: Station) => {
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("StationDetail", { title: station.title });
  };

  onSelectSearchRadius = (radius: number) => {
    this.props.setSearchRadius(radius);
  };

  render() {
    let sortedStations = this.props.stations;
    if (!__DEV__)
      sortedStations = sortedStations
        .filter(withinSearchRadius.bind(this))
        .sort(closestFirst.bind(this));

    return (
      <ScrollView>
        <FilterInput
          onSelectDropdown={this.onSelectSearchRadius.bind(this)}
          startingValue={this.props.searchRadius}
        />
        <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={this.props.isLoading}
        />
        {!sortedStations.length || !this.props.location ? (
          <EmptyStationList />
        ) : (
          <StationsList
            stations={sortedStations}
            navigation={this.props.navigation}
            onTextPress={this.onStationClick.bind(this)}
          />
        )}
      </ScrollView>
    );
  }
}

function closestFirst(a: Station, b: Station): number {
  if (!a.location || !b.location) return 0;
  const distA = a.distanceFromLocation(this.props.location);
  const distB = b.distanceFromLocation(this.props.location);
  if (!distA || !distB) return 0;
  return distA > distB ? 1 : -1;
}

function withinSearchRadius(station: Station): boolean {
  const dist = station.distanceFromLocation(this.props.location);
  if (dist) {
    const bool = dist <= this.props.searchRadius;
    return bool;
  } else if (this.props.searchRadius === 1e100) {
    return true;
  }
  return false;
}

const mapStateToProps = ({ main, location }) => {
  // debugger;
  return {
    stations: Object.values(main.stations),
    isLoading: main.isLoading,
    // location: main.currentRegion,
    location: location.currentRegion,
    searchRadius: location.searchRadiusInMiles
  };
};

export const StationsListViewBasic = StationsListView;

export default connect(
  mapStateToProps,
  { setCurrentStationID, setSearchRadius }
)(StationsListView);

const styles = {
  emptyListContainer: {
    justifyContent: "center",
    height: "90%",
    padding: 10
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    padding: 10
  }
};
