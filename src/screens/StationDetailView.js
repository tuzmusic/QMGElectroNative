import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import {
  ScrollView,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { Image, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MaterialIndicator } from "react-native-indicators";
import OpenMap from "../components/OpenMap/OpenMap";

const CellTextRow = props => (
  <BLText style={[{ padding: 2, textAlign: "left" }, props.style]}>
    {props.children}
  </BLText>
);

const Spinner = <MaterialIndicator color={"blue"} />;

function openURL(url) {
  Linking.openURL(url).catch(error => {
    console.warn("An error occurred", error);
  });
}

const StationWebsite = ({ station }) => {
  if (station.website) {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(station.website)}>
        <CellTextRow style={[text.address, text.link]}>
          {station.website}
        </CellTextRow>
      </TouchableOpacity>
    );
  }
  return null;
};

const StationImage = ({ station }) => {
  if (station.featuredImage?.url) {
    return (
      <Image
        style={styles.image}
        containerStyle={styles.imageContainer}
        source={{ uri: station.featuredImage.url }}
        PlaceholderContent={Spinner}
      />
    );
  } else {
    return (
      <View style={[styles.centered, styles.image]}>
        <BLText>No Image Provided</BLText>
      </View>
    );
  }
};

const ContactIcon = props => {
  return (
    <Icon
      reverse
      size={20}
      color="lightgrey"
      reverseColor="black"
      activeOpacity={0.5}
      name={props.icon.name}
      type={props.icon.type}
      onPress={props.onPress}
      containerStyle={styles.iconContainer}
    />
  );
};

const ContactButtons = ({ station }) => {
  return (
    <View style={[styles.iconCell]}>
      {station.contactEmail ? (
        <ContactIcon
          icon={{ name: "email-outline", type: "material-community" }}
          onPress={() => openURL(`mailto:${station.contactEmail}`)}
        />
      ) : null}
      {station.contactPhone ? (
        <ContactIcon
          icon={{ name: "phone", type: "feather" }}
          onPress={() => openURL(`tel:${station.contactPhone}`)}
        />
      ) : null}
    </View>
  );
};

class StationDetailView extends Component {
  state = {
    showMapOpener: false
    // showMapOpener: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  handleAddressPress = () => this.setState({ showMapOpener: true });

  render() {
    const { station } = this.props;
    return (
      <ScrollView>
        {this.state.showMapOpener && (
          <OpenMap
            station={station}
            onBackdropPress={() => this.setState({ showMapOpener: false })}
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
          {/* Website */}
          <StationWebsite station={station} />
          {/* 
            <CellTextRow style={[text.address]}>
            {station.contactEmail}
          </CellTextRow>
          <CellTextRow style={[text.address]}>
            {station.contactPhone}
          </CellTextRow> 
          <ContactButtons station={station} />
        */}
          {/* Price */}
          <CellTextRow style={[text.price]}>
            {/* Adds dollar sign to a bare number but leaves prices with dollar signs alone */}
            {station.priceString("Free charging!")}
          </CellTextRow>
          {/* Description */}
          <CellTextRow style={[text.description, { paddingTop: 20 }]}>
            {station.description}
          </CellTextRow>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  station: state.main.stations[state.main.currentStationID],
  stations: state.main.stations
});

export default connect(mapStateToProps)(StationDetailView);

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
    width: "100%",
    paddingVertical: 20
  }
};
const full = "100%";
const { height, width } = Dimensions.get("window");
const styles = {
  iconCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: "100%"
  },
  iconContainer: {
    marginHorizontal: 25,
    marginVertical: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  imageContainer: {
    // backgroundColor: "lightgrey"
    height: height * 0.3
  },
  image: {
    height: full,
    width: full,
    resizeMode: "cover"
    // width: 100,
  },
  bordered: {
    borderColor: "black",
    borderWidth: 1
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
};
