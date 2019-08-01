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
        <View style={{ alignItems: "center" }}>
          <UserImage user={user} />
          <Text style={text.username}> {user.username} </Text>
        </View>
        <View style={styles.leftJustifiedContainer}>
          <Label>Name:</Label>
          <InfoText>{user.fullName}</InfoText>
          <Label>Email:</Label>
          <InfoText>{user.email}</InfoText>
          <Label>About:</Label>
          <InfoText>{user.description}</InfoText>
        </View>
      </View>
    );
  }
}
const baseSize = 18;

const Label = ({ children }) => (
  <Text
    style={[
      {
        fontWeight: "bold",
        fontSize: baseSize - 2,
        color: "grey"
      }
    ]}
  >
    {children}
  </Text>
);

const InfoText = ({ children }) => (
  <Text style={[{ fontSize: baseSize, marginTop: 3, marginBottom: 20 }]}>
    {children}
  </Text>
);

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
    width: "100%",
    marginTop: 20
  },
  leftJustifiedContainer: {
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 10
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