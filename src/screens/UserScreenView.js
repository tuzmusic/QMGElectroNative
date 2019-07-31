import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import AsyncStorage from "@react-native-community/async-storage";
import UserProfile from "../subviews/UserProfile";

class UserScreen extends Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }

  async performLogout() {
    console.log("Logging out");

    await AsyncStorage.setItem("electro_logged_in_user", "");
    const storage = await AsyncStorage.getItem("electro_logged_in_user");
    // console.log(" newly logged out user has been saved as:", storage);
    await this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          {this.props.user && <UserProfile user={this.props.user} />}
          <Button
            buttonStyle={styles.logout}
            containerStyle={styles.button}
            color="red"
            titleStyle={styles.text}
            onPress={this.performLogout.bind(this)}
            title="Log Out"
            loading={this.props.isLoading}
            disabled={this.props.isLoading}
          />
        </View>
        <View style={styles.bottomSection}>
          <Text style={[styles.text]}>Please</Text>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() =>
              Linking.openURL("http://joinelectro.com/submit-listings/")
            }
          >
            <Text style={[styles.text, styles.link]}>visit the website</Text>
          </TouchableOpacity>
          <Text style={[styles.text]}>to create a station.</Text>
        </View>
      </View>
    );
  }
}

export default connect(
  state => {
    return { user: state.auth.user, isLoading: state.auth.isLoading };
  },
  { logout }
)(UserScreen);

const styles = {
  container: {
    flex: 1,
    // marginVertical: 80,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  topSection: { width: "100%", alignItems: "center" },
  button: { width: "65%", marginTop: 30 },
  logout: { backgroundColor: "red" },
  text: { fontSize: 24, textAlign: "center" },
  link: { color: "blue", textDecorationLine: "underline" }
};
