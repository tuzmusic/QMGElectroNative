import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import {
  ScrollView,
  View,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";
import { Image, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { getImageURLForStation } from "../redux/actions/stationActions";
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
  if (station.mediaDataURL || station.imageURL) {
    return (
      <Image
        style={[styles.image, { resizeMode: "cover" }]}
        source={{ uri: station.imageURL }}
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

function mapQueryUrl({ title, location }) {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${location.latitude},${location.longitude}`;
  const url = Platform.select({
    ios: `${scheme}${title}@${latLng}`,
    android: `${scheme}${latLng}(${title})`
  });
  return url;
}

class StationDetailView extends Component {
  state = {
    showMapOpener: false,
    showMapOpener: true
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  async componentDidMount() {
    if (!this.props.station.imageURL) {
      try {
        await this.props.getImageURLForStation(this.props.station);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  handleAddressPress() {
    this.setState({ showMapOpener: true });
  }

  render() {
    if (!this.props.station) return null;
    const { station } = this.props;

    return (
      <ScrollView>
        {this.state.showMapOpener && <OpenMap station={station} />}
        <View style={styles.imageContainer}>
          <StationImage station={station} />
        </View>

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
          <CellTextRow style={[text.address]}>
            {station.contactEmail}
          </CellTextRow>
          <CellTextRow style={[text.address]}>
            {station.contactPhone}
          </CellTextRow>
          <ContactButtons station={station} />
          {/* Price */}
          <CellTextRow style={[text.price]}>
            {/* Adds dollar sign to a bare number but leaves prices with dollar signs alone */}
            {station.priceString("Free charging!")}
          </CellTextRow>
          {/* Description */}
          <CellTextRow style={[text.content, { paddingTop: 20 }]}>
            {station.content.replace("<p>", "").replace("</p>", "")}
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

export default connect(
  mapStateToProps,
  { getImageURLForStation }
)(StationDetailView);

const baseSize = 17;
const text = {
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  address: {
    fontSize: baseSize
  },
  content: {
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
  imageContainer: {
    backgroundColor: "lightgrey"
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  image: {
    height: 250,
    width: null
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
