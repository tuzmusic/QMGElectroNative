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
    labelStyle={{ marginBottom: -5, marginTop: 10, borderWidth: 0 }}
  />
);

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount = () => {
    // if (__DEV__) this.setState({ username: "testuser1", password: "123123" });
  };

  render() {
    return (
      <React.Fragment>
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
        <Button
          title="Login"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
          containerStyle={{
            padding: 30,
            width: "100%"
          }}
        />
        <TouchableOpacity onPress={this.props.onLinkClick}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Don't have an account? <Text style={styles.link}>Register</Text>.
          </Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  isLoading: state.auth.isLoading
}))(LoginForm);

const styles = {
  text: { fontSize: 20 },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
