import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginView";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { setUser } from "../redux/actions/authActions";
import User from "../models/User";
import StorageManager from "../models/StorageManager";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export class AuthNavigator extends Component {
  static router = AuthStack.router;

  async componentDidMount() {
    this.loginStoredUser();
  }

  async loginStoredUser() {
    const user = await StorageManager.getStoredUser();
    if (user) {
      this.props.setUser(user);
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

export default connect(
  null,
  { setUser }
)(AuthNavigator);
