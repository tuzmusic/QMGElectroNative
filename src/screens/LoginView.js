// @flow
import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import {
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  SafeAreaView
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, register, clearAuthError } from "../redux/actions/authActions";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import { validate } from "email-validator";
import AsyncStorage from "@react-native-community/async-storage";
import User from "../models/User";

const Loading = props => (
  <Overlay
    containerStyle={styles.modal}
    height={200}
    width={200}
    isVisible={props.isVisible}
    style={styles.modal}
    borderRadius={20}
    overlayBackgroundColor={"lightblue"}
  >
    <View style={styles.modalContainer}>
      <DotIndicator color={"darkgrey"} />
      <Text>Logging in...</Text>
    </View>
  </Overlay>
);

const Errors = props => (
  <View
    style={{
      marginBottom: props.errors.length ? 0 : -10,
      marginHorizontal: 10
    }}
  >
    {props.errors.map((e, i) => (
      <Text style={styles.errorText} key={i}>
        {e}
      </Text>
    ))}
  </View>
);

const Form = props => (
  <View style={styles.formContainer}>
    <Errors error={props.error} errors={props.errors} />
    {props.loggingIn && (
      <LoginForm
        onSubmit={props.handleLogin}
        onLinkClick={props.toggleForm}
        onChangeText={props.resetErrors}
      />
    )}
    {props.registering && (
      <RegisterForm
        onSubmit={props.handleRegister}
        onLinkClick={props.toggleForm}
        onChangeText={props.resetErrors}
      />
    )}
  </View>
);

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
    function autoLogin() {
      setTimeout(
        () => this.handleLogin({ username: "testuser1", password: "123123" }),
        500
      );
    }
    // autoLogin();
    if (__DEV__) this.toggleForm();
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
      memberType: "provider"
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
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={{ resizeMode: "cover" }}
        source={require("../../assets/images/charging-a-car.png")}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            enabled
            behavior="height"
          >
            <Loading isVisible={this.props.isLoading} />
            <Image
              source={require("../../assets/logos/ElectroLogo.png")}
              style={styles.image}
            />
            <Form
              error={this.props.error}
              errors={this.state.errors}
              loggingIn={this.state.loggingIn}
              registering={this.state.registering}
              toggleForm={this.toggleForm.bind(this)}
              handleLogin={this.handleLogin.bind(this)}
              handleRegister={this.handleRegister.bind(this)}
              resetErrors={() => this.setState({ errors: [] })}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
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

const dim = Dimensions.get("window");
const h = (perc: number) => (dim.height * perc) / 100;

const styles = {
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  imageBackground: {
    height: "100%"
  },
  scrollView: {
    paddingVertical: 30
  },
  keyboardAvoidingView: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: h(30),
    width: h(30),
    maxHeight: 200,
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
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 5
  }
};
