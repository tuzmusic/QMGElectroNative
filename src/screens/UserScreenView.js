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

class UserScreen extends Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }
  static navigationOptions = {
    title: "User"
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.user && (
          <UserProfile
            user={this.props.user}
            onLogout={this.props.logout.bind(this)}
          />
        )}
        <Image
          source={require("../../assets/logos/ElectroLogo.png")}
          style={styles.image}
        />
        <View>
          <View style={styles.rowText}>
            <Text>To create a station, please </Text>
            <Link url="http://joinelectro.com/submit-listings/">
              visit our website
            </Link>
            <Text>.</Text>
          </View>
          <View style={styles.rowText}>
            <Text>For questions, email </Text>
            <Link url="mailto:info@joinelectro.com">info@joinelectro.com</Link>
            <Text style={styles.text}>.</Text>
          </View>
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
  rowText: { flexDirection: "row", marginBottom: 5 },
  link: { color: "blue", textDecorationLine: "underline" }
};
