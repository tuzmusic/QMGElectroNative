import React, { Fragment, Component } from "react";
import { Button, ThemeProvider, CheckBox } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { AuthFormInput as Input } from "./LoginForm";

const testParams = {
  username: "testuser1",
  email: "api1@bolt.com",
  firstName: "Nicola",
  lastName: "Tesla",
  password: "123123",
  passwordConfirmation: "123123"
};

inputs = {
  username: "Username",
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  password: "Password",
  retype: "Retype Password"
};

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
    memberType: "provider"
  };

  componentDidMount() {
    if (__DEV__) this.setState(testParams);
  }

  moveToNextInput(fromName) {
    const index = this.inputs.order.indexOf(fromName);
    const nextName = this.inputs.order[index + 1];
    const nextInput = this.inputs[nextName];
    nextInput && nextInput.focus();
  }

  inputs = {
    order: Object.values(inputs)
  };

  render() {
    return (
      <Fragment key="CONTAINER">
        <Fragment key="INPUTS">
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
            placeholder={inputs.firstName}
            ref={i => (this.inputs[inputs.firstName] = i)}
            label={this.state.firstName && inputs.firstName}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            onSubmitEditing={this.moveToNextInput.bind(this, inputs.firstName)}
            returnKeyType={"next"}
          />
          <Input
            placeholder={inputs.lastName}
            ref={i => (this.inputs[inputs.lastName] = i)}
            label={this.state.lastName && inputs.lastName}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            onSubmitEditing={this.moveToNextInput.bind(this, inputs.lastName)}
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
        </Fragment>
        <View key="MEMBER TYPE" style={styles.checkboxSupercontainer}>
          <Text></Text>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Provider - FREE for the first 6 months"
            checked={this.state.memberType === "provider"}
            onPress={() => this.setState({ memberType: "provider" })}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="User - Free"
            checked={this.state.memberType === "user"}
            onPress={() => this.setState({ memberType: "user" })}
          />
        </View>
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
      </Fragment>
    );
  }
}

export default connect(({ auth: { isLoading } }) => ({
  isLoading
}))(RegisterForm);

const styles = {
  checkboxSupercontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 25,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxContainer: {
    borderWidth: 0,
    borderColor: "black",
    backgroundColor: "transparent",
    width: "90%"
  },
  checkboxText: {
    fontSize: 16
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
