import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import { connect } from "react-redux";
import OpenMap from "../components/OpenMap/OpenMap";

const screens = { Auth: AuthStack, Main: MainTabNavigator };
// if (__DEV__) delete screens.Auth;

const SwitchNavigator = createSwitchNavigator(screens);

const AppNavigator = createAppContainer(SwitchNavigator);

class AppContainer extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default connect()(AppContainer);
