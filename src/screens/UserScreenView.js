import React, { Component } from "react";
import {
  View,
  Text as BaseText,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import UserProfile from "../subviews/UserProfile";
import { Divider, Image } from "react-native-elements";
import StorageManager from "../models/StorageManager";

class UserScreen extends Component {
  static navigationOptions = {
    title: "User"
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.user) {
      this.props.navigation.navigate("Auth");
      return false;
    }
    return true;
  }

  async performLogout() {
    this.props.logout();
    await StorageManager.logout();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.user && (
          <UserProfile
            user={this.props.user}
            onLogout={async () => await this.performLogout()}
          />
        )}
        <Image
          source={require("../../assets/logos/ElectroLogo.png")}
          style={styles.image}
        />
        <View>
          {this.props.user.memberType === "provider" && (
            <View>
              <Text>To create a station, please </Text>
              <Link url="http://joinelectro.com/submit-listings/">
                visit our website
              </Link>
              <Text>.</Text>
            </View>
          )}
          <Text>For questions, email </Text>
          <Link url="mailto:info@joinelectro.com">info@joinelectro.com</Link>
          <Text style={styles.text}>.</Text>
        </View>
      </ScrollView>
    );
  }
}

const Text = props => (
  <BaseText style={[styles.text, props.style]}>{props.children}</BaseText>
);

const Link = props => (
  <TouchableOpacity onPress={() => Linking.openURL(props.url)}>
    <Text style={[styles.text, styles.link]}>{props.children}</Text>
  </TouchableOpacity>
);

export default connect(
  ({ auth: { user, isLoading } }) => ({ user, isLoading }),
  { logout }
)(UserScreen);

const styles = {
  container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: { height: 110, width: 110, resizeMode: "contain", marginVertical: 15 },
  text: { fontSize: 18, textAlign: "center" },
  rowText: { flexDirection: "row", marginBottom: 5, width: "100%" },
  link: { color: "blue", textDecorationLine: "underline" }
};
