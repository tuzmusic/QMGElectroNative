import React, { Component } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { AuthFormInput as Input } from "./LoginForm";

class LoginForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  componentDidMount() {
    // if (__DEV__)
    //   this.setState({
    //     username: "apptestprovider",
    //     password: "123123",
    //     passwordConfirmation: "123123",
    //     email: "apptestprovider@bolt.com"
    //   });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
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
          />
          <TouchableOpacity onPress={this.props.onLinkClick}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Already have an account? <Text style={styles.link}>Log in</Text>.
            </Text>
          </TouchableOpacity>
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
      // padding: 5
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
      fontSize: 16
    }
  }
};

const styles = {
  container: {
    width: "90%",
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
