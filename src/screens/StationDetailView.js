import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import {
  ScrollView,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  Text
} from "react-native";
import { Image, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MaterialIndicator } from "react-native-indicators";
import OpenMap from "../components/OpenMap/OpenMap";

const CellTextRow = props => (
  <View style={props.containerStyle}>
    <BLText style={[{ padding: 2, textAlign: "left" }, props.style]}>
      {props.children}
    </BLText>
  </View>
);

const StationImage = ({ station }) =>
  station.featuredImage?.url ? (
    <Image
      style={styles.image}
      containerStyle={styles.imageContainer}
      source={{ uri: station.featuredImage.url }}
      PlaceholderContent={<MaterialIndicator color={"blue"} />}
    />
  ) : (
    <View style={[styles.centered, styles.image]}>
      <BLText>No Image Provided</BLText>
    </View>
  );

class StationDetailView extends Component {
  state = { showMapOpener: false };
  station = this.props.navigation.getParam("station");

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  handleAddressPress = () => this.setState({ showMapOpener: true });
  dismissMapOpener = () => this.setState({ showMapOpener: false });
  render() {
    const station = this.station;
    return (
      <ScrollView>
        {this.state.showMapOpener && (
          <OpenMap
            station={station}
            onBackdropPress={this.dismissMapOpener.bind(this)}
          />
        )}

        <StationImage station={station} />

        <View style={styles.textContainer}>
          {/* Title */}
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          {/* Address */}
          <TouchableOpacity onPress={this.handleAddressPress.bind(this)}>
            <CellTextRow style={[text.address, text.link]}>
              {station.address}
            </CellTextRow>
          </TouchableOpacity>
          {/* Price */}
          <CellTextRow
            style={text.price}
            containerStyle={styles.priceContainer}
          >
            {/* Adds dollar sign to a bare number but leaves prices with dollar signs alone */}
            {station.priceString("Free charging!")}
          </CellTextRow>
          {/* Description */}
          <CellTextRow style={[text.description]}>
            {station.description}
          </CellTextRow>
        </View>
      </ScrollView>
    );
  }
}

export default connect()(StationDetailView);

const baseSize = 17;
const text = {
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  address: {
    fontSize: baseSize
  },
  description: {
    fontSize: baseSize
  },
  website: {
    fontSize: baseSize
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  price: {
    fontSize: baseSize + 4,
    textAlign: "center",
    width: "100%"
  }
};
const full = "100%";
const { height, width } = Dimensions.get("window");
const styles = {
  priceContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    width: full
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  imageContainer: {
    height: height * 0.3
  },
  image: {
    height: full,
    width: full,
    resizeMode: "cover"
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
};
