// @flow

import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, register, clearAuthError } from "../redux/actions/authActions";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import { validate } from "email-validator";
import AsyncStorage from "@react-native-community/async-storage";
import User from "../models/User";

type State = { loggingIn: boolean, registering: boolean, errors: string[] };
type Props = Object;
type AuthParams = { email?: string, username: string, password: string };
class LoginView extends Component<Props, State> {
  state = {
    loggingIn: true,
    registering: false,
    errors: []
  };

  componentDidMount() {
    function registerInstead() {
      this.setState({ loggingIn: false, registering: true });
    }
    function autoLogin() {
      setTimeout(() => {
        this.handleLogin({ username: "testuser1", password: "123123" });
      }, 500);
    }
    // autoLogin();
    registerInstead.call(this);
  }

  async handleLogin({ username, password }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!password) errors.push("Password required");

    if (errors.length) {
      this.props.clearAuthError();
      return this.setState({ errors });
    }

    let creds: AuthParams = { password, username: "" };
    if (username.includes("@")) {
      creds.email = username;
    } else {
      creds.username = username;
    }

    await this.props.login(creds);
  }

  async handleRegister({ username, email, password, passwordConfirmation }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!email) errors.push("Email required");
    if (!validate(email)) errors.push("Please enter a valid email address");
    if (!password) errors.push("Password required");
    if (password && !passwordConfirmation)
      errors.push("Please type your password twice");
    if (password && passwordConfirmation && password !== passwordConfirmation)
      errors.push("Passwords don't match");

    this.props.clearAuthError();
    this.setState({ errors });
    if (errors.length) return;
    await this.props.register({
      username,
      email,
      password,
      memberType: "user"
    });
  }

  async loginUser({ user }) {
    if (!user) return;
    try {
      await AsyncStorage.setItem(
        "electro_logged_in_user",
        JSON.stringify(user)
      );
    } catch (error) {
      console.warn("Couldn't write user to storage.", error);
    }

    this.props.navigation.navigate("Main");
  }

  toggleForm() {
    this.props.clearAuthError();
    this.setState({
      errors: [],
      loggingIn: !this.state.loggingIn,
      registering: !this.state.registering
    });
  }

  render() {
    // user exists on render if a login has succeeded, or if a saved user has been found
    // loginUser saves the user, even if the user was already saved. No biggie.
    if (this.props.user) this.loginUser(this.props);
    return (
      <KeyboardAvoidingView
        style={styles.superContainer}
        enabled
        behavior="height"
      >
        <ImageBackground
          style={{
            height: "100%",
            width: "100%"
            // justifyContent: "flex-start"
          }}
          imageStyle={{ resizeMode: "cover" }}
          source={require("../../assets/images/charging-a-car.png")}
        >
          <View style={styles.container}>
            <Overlay
              containerStyle={styles.modal}
              height={200}
              width={200}
              isVisible={this.props.isLoading}
              style={styles.modal}
              borderRadius={20}
              overlayBackgroundColor={"lightblue"}
            >
              <View style={styles.modalContainer}>
                <DotIndicator color={"darkgrey"} />
                <Text>Logging in...</Text>
              </View>
            </Overlay>
            <Image
              source={require("../../assets/logos/ElectroLogo.png")}
              style={styles.image}
            />
            {this.state.errors.map((e, i) => (
              <Text style={styles.errorText} key={i}>
                {e}
              </Text>
            ))}
            {!this.state.errors.length && (
              <Text style={styles.errorText}>{this.props.error}</Text>
            )}

            {this.state.loggingIn && (
              <LoginForm
                onSubmit={this.handleLogin.bind(this)}
                onLinkClick={this.toggleForm.bind(this)}
                onChangeText={() => this.setState({ errors: [] })}
              />
            )}
            {this.state.registering && (
              <RegisterForm
                onSubmit={this.handleRegister.bind(this)}
                onLinkClick={this.toggleForm.bind(this)}
                onChangeText={() => this.setState({ errors: [] })}
              />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
  }),
  { login, register, clearAuthError }
)(LoginView);

const styles = {
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  superContainer: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 40
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
