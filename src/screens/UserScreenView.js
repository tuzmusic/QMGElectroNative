import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import UserProfile from "../subviews/UserProfile";

class UserScreen extends Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.user && (
          <UserProfile
            user={this.props.user}
            onLogout={this.props.logout.bind(this)}
          />
        )}
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
    justifyContent: "flex-start",
    alignItems: "center"
  },
  topSection: { width: "100%", alignItems: "center" },
  button: { width: "65%", marginTop: 30 },
  logout: { backgroundColor: "red" },
  text: { fontSize: 24, textAlign: "center" },
  link: { color: "blue", textDecorationLine: "underline" }
};
