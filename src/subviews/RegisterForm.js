import React, { Component } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { AuthFormInput as Input } from "./LoginForm";

const testParams = {
  username: "apptestprovider",
  password: "123123",
  passwordConfirmation: "123123",
  email: "apptestprovider@bolt.com"
};

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  componentDidMount() {
    // if (__DEV__) this.setState(testParams);
  }

  render() {
    return (
      <React.Fragment>
        <Input
          placeholder="Username"
          label={this.state.username && "Username"}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <Input
          placeholder="Email"
          label={this.state.email && "Email"}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          label={this.state.password && "Password"}
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Input
          placeholder="Retype password"
          label={this.state.passwordConfirmation && "Retype password"}
          secureTextEntry
          value={this.state.passwordConfirmation}
          onChangeText={passwordConfirmation =>
            this.setState({ passwordConfirmation })
          }
        />
        <Button
          title="Register"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
          containerStyle={{
            padding: 30,
            width: "100%"
          }}
        />
        <TouchableOpacity onPress={this.props.onLinkClick}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Already have an account? <Text style={styles.link}>Log in</Text>.
          </Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

export default connect(({ auth: { isLoading } }) => ({
  isLoading
}))(RegisterForm);

const styles = {
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
