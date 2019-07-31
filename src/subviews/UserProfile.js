// @flow
import React, { Component } from "react";
import { Text, View } from "react-native";
import { Image, Button, Icon, Avatar } from "react-native-elements";
import User from "../models/User";
import { MaterialIndicator } from "react-native-indicators";

type Props = {
  user: User
};

export default class UserProfile extends Component<Props> {
  render() {
    const user = this.props.user;
    return (
      <View style={styles.container}>
        <UserImage user={user} />
        <Text style={text.username}> {user.username} </Text>
        <Text>Full name: {user.fullName}</Text>
      </View>
    );
  }
}

const UserImage = ({ user }: { user: User }) => {
  if (user.avatarUrl) {
    return (
      <Avatar
        rounded
        size={150}
        source={{ uri: user.avatarUrl }}
        PlaceholderContent={<MaterialIndicator color={"blue"} />}
      />
    );
  } else {
    return (
      <View style={[styles.centered, styles.image]}>
        <Text>No Image Provided</Text>
      </View>
    );
  }
};

const baseSize = 14;
const text = {
  username: {
    fontSize: baseSize + 4,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  }
};

const styles = {
  container: {
    // borderWidth: 1
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 50
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
};
