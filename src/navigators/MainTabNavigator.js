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
import { getLocation } from "../redux/actions/locationActions";

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
ListStack.navigationOptions = {
  tabBarLabel: "List",
  tabBarIcon: ({ focused: f }) => icon(f, "list", "", "feather")
};

const MapStack = createStackNavigator({
  MapScreen: MapScreen,
  ResultsScreen: StationsListScreen,
  StationDetail: StationDetailScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused: f }) => icon(f, "map", "map-o", "font-awesome")
};

const UserStack = createStackNavigator({
  UserScreen
});

UserStack.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused: f }) =>
    icon(f, "user-circle", "user-circle-o", "font-awesome")
};

// #endregion

const TabNavigator = createBottomTabNavigator(
  { MapStack, ListStack, UserStack }
  // { initialRouteName: (__DEV__ ? "List" : "Map") + "Stack" }
);

class TabContainer extends Component {
  componentDidMount = async () => {
    this.props.getLocation();
    await this.props.fetchStations();
  };

  static router = TabNavigator.router;
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}

export default connect(
  ({ main }) => ({ stations: main.stations }),
  { fetchStations, getLocation }
)(TabContainer);
