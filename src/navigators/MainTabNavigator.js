import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import { Icon } from "react-native-elements";

import MapScreen from "../screens/MapView";
import StationsListScreen from "../screens/StationsListView";
import StationDetailScreen from "../screens/StationDetailView";
import UserScreen from "../screens/UserScreenView";

import { fetchStations } from "../redux/actions/stationActions";
// import { getLocationAsync } from "../redux/actions/locationActions";

// #region CONFIGURE STACKS
const ListStack = createStackNavigator({
  ListScreen: StationsListScreen,
  StationDetail: StationDetailScreen
});

function icon(focused, focIcon, unfocIcon, type) {
  return (
    <TabBarIcon
      focused={focused}
      name={focused ? focIcon : unfocIcon || focIcon}
      type={type}
    />
  );
}
console.disableYellowBox = true;
ListStack.navigationOptions = {
  tabBarLabel: "List",
  tabBarIcon: ({ focused: f }) => icon(f, "ios-list")
};

const MapStack = createStackNavigator({
  MapScreen: MapScreen,
  ResultsScreen: StationsListScreen,
  StationDetail: StationDetailScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused: f }) => icon(f, "map", "map-o", "FontAwesome")
};

const UserStack = createStackNavigator({
  UserScreen
});

UserStack.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused: f }) =>
    icon(f, "user-circle", "user-circle-o", "FontAwesome")
};

// #endregion

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ListStack,
    UserStack
  },
  {
    initialRouteName: "UserStack",
    initialRouteName: "ListStack",
    initialRouteName: "MapStack",
    butt: "butt"
  }
);

class TabContainer extends Component {
  componentDidMount = async () => {
    // this.props.getLocationAsync();
    if (!__DEV__) await this.props.fetchStations();
    // await this.props.fetchStations();
  };

  static router = TabNavigator.router;
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}

export default connect(
  ({ main }) => ({ stations: main.stations, userLocation: main.currentRegion }),
  {
    fetchStations
    // getLocationAsync
  }
)(TabContainer);
