import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import { connect } from "react-redux";
import OpenMap from "../components/OpenMap/OpenMap";

const screens = {};
// if (__DEV__) delete screens.Auth;
screens["Auth"] = AuthStack;
screens["Main"] = MainTabNavigator;

// TO-DO: perform loginStoredUser here instead of in AuthNavigator.
// The "challenge" is that it's an async function so I'll have to wrap everything in another component or something.

const SwitchNavigator = createSwitchNavigator(screens);

const AppNavigator = createAppContainer(SwitchNavigator);

class AppContainer extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default connect()(AppContainer);
