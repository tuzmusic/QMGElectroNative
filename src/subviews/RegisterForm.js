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

inputs = {
  username: "Username",
  email: "Email",
  password: "Password",
  retype: "Retype Password"
};

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  componentDidMount() {
    if (__DEV__) this.setState(testParams);
  }

  moveToNextInput(fromName) {
    const index = this.inputs.order.indexOf(fromName);
    const nextName = this.inputs.order[index + 1];
    const nextInput = this.inputs[nextName];
    // debugger;
    nextInput.focus();
  }

  inputs = {
    order: ["Username", "Email", "Password", "Retype Password"]
  };

  render() {
    return (
      <React.Fragment>
        <Input
          placeholder={inputs.username}
          ref={i => (this.inputs[inputs.username] = i)}
          label={this.state.username && inputs.username}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          onSubmitEditing={this.moveToNextInput.bind(this, inputs.username)}
          returnKeyType={"next"}
        />
        <Input
          placeholder={inputs.email}
          ref={i => (this.inputs[inputs.email] = i)}
          label={this.state.email && inputs.email}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={this.moveToNextInput.bind(this, inputs.email)}
          returnKeyType={"next"}
        />
        <Input
          placeholder={inputs.password}
          ref={i => (this.inputs[inputs.password] = i)}
          label={this.state.password && inputs.password}
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={this.moveToNextInput.bind(this, inputs.password)}
          returnKeyType={"next"}
        />
        <Input
          placeholder={inputs.retype}
          ref={i => (this.inputs[inputs.retype] = i)}
          label={this.state.passwordConfirmation && inputs.retype}
          secureTextEntry
          value={this.state.passwordConfirmation}
          onChangeText={passwordConfirmation =>
            this.setState({ passwordConfirmation })
          }
          returnKeyType={"done"}
          onSubmitEditing={() => this.props.onSubmit(this.state)}
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
