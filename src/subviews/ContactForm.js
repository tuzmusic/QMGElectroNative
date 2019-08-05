// @flow
import React, { Component } from "react";
import {
  Text,
  Input,
  Button,
  AirbnbRating,
  Divider
} from "react-native-elements";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

type Props = {
  onSubmit: function,
  onCancel: function,
  label: string, 
  placeholder: string,
  buttonText: string
};
type State = { content: string };

export default class ContactForm extends Component<Props, State> {
  state: State = {
    content: ""
  };
  textInput: ?Component<Object>;
  static defaultProps = {
    showButtons: true
  };
  render() {
    return (
      <View style={styles.container}>
        <Input
          ref={ref => (this.textInput = ref)}
          label={this.props.label}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          placeholder={this.props.placeholder}
          value={this.state.content}
          onChangeText={content => this.setState({ content })}
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={100}
          labelStyle={styles.fieldLabel}
        />
        <Button
          title={this.props.buttonText}
          buttonStyle={styles.button}
          onPress={() => this.props.onSubmit(this.state.content)}
        />
      </View>
    );
  }
}
const baseSize = 16;
const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: 30
  },
  button: {
    width: "100%",
  },
  input: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 150
  },
  inputContainer: {
    borderBottomWidth: 0,
    marginVertical: 15,
    marginHorizontal: 5
  },
  ratingContainer: { width: "100%", paddingHorizontal: 10, marginBottom: 15 },
  fieldLabel: {
    textAlign: "left",
    alignItems: "flex-start",
    color: "black",
    fontWeight: "normal",
    fontSize: baseSize + 2
  }
};
