import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity, Linking, View } from "react-native";
import { connect } from "react-redux";

export const AuthFormInput = props => (
  <Input
    {...props}
    placeholderTextColor="darkgrey"
    autoCorrect={false}
    autoCapitalize={"none"}
  />
);

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount = () => {
    if (__DEV__) this.setState({ username: "testuser1", password: "123123" });
  };

  render() {
    const regUrl = "https://joinelectro.com/registration-new/";
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.inputContainer}>
          <AuthFormInput
            placeholder="Username or Email"
            label={this.state.username && "Username or Email"}
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <AuthFormInput
            placeholder="Password"
            label={this.state.password && "Password"}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Button
          title="Login"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
        />
        <View style={styles.messageContainer}>
          <TouchableOpacity onPress={this.props.onLinkClick}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Don't have an account? <Text style={styles.link}>Register</Text>.
            </Text>
          </TouchableOpacity>
          {/*
          {/* <Text style={styles.text}>Don't have an account?</Text>
           <TouchableOpacity onPress={() => Linking.openURL(regUrl)}>
            <Text style={[styles.text, styles.link]}>
              Register on our website.
            </Text>
          </TouchableOpacity> */}
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(state => ({
  isLoading: state.auth.isLoading
}))(LoginForm);

const theme = {
  Input: {
    containerStyle: {
      padding: 10,
      width: "100%"
    }
  },
  Button: {
    containerStyle: {
      padding: 30,
      width: "100%"
    }
  },
  Text: {
    style: {
      fontSize: 26
    }
  }
};

const styles = {
  inputContainer: {
    width: "90%",
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 5
  },
  text: { fontSize: 20 },
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // width: "80%",
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 5
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
