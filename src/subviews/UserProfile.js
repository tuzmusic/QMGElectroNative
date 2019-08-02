// @flow
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image, Button, Icon, Avatar } from "react-native-elements";
import User from "../models/User";
import { MaterialIndicator } from "react-native-indicators";

type Props = {
  user: User,
  onLogout: Function
};

export default class UserProfile extends Component<Props> {
  render() {
    const user = this.props.user;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <UserImage user={user} />
          <Text style={text.username}>{user.username}</Text>
          <Link onPress={this.props.onLogout}>(Log out)</Link>
        </View>
        <View style={styles.leftJustifiedContainer}>
          <Label>Name:</Label>
          <InfoText>{user.firstName ? user.fullName : "Not provided"}</InfoText>
          <Label>Email:</Label>
          <InfoText>{user.email}</InfoText>
          <Label>About:</Label>
          <InfoText>{user.description || "Not provided"}</InfoText>
          <Label>Member type:</Label>
          <InfoText>{user.memberType || "Not provided"}</InfoText>
        </View>
      </View>
    );
  }
}
const baseSize = 18;

const Link = (props: Object) => (
  <TouchableOpacity onPress={props.onPress}>
    <InfoText
      style={{
        color: "blue",
        fontSize: baseSize - 2
      }}
    >
      {props.children}
    </InfoText>
  </TouchableOpacity>
);

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

const InfoText = (props: Object) => (
  <Text
    style={[
      { fontSize: baseSize, marginTop: 3, marginBottom: 20 },
      props.style
    ]}
  >
    {props.children}
  </Text>
);

const UserImage = ({ user }: { user: User }) => (
  <Avatar
    rounded
    size={150}
    source={{ uri: user.avatarUrl }}
    title="none provided"
    titleStyle={{ fontSize: 16, color: "black" }}
    PlaceholderContent={<MaterialIndicator color={"blue"} />}
  />
);

const text = {
  username: {
    fontSize: baseSize + 4,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10
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
