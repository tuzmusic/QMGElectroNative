//  @flow
import type { Location } from "../redux/reducers/locationReducer";
import * as React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import AppStyles from "../constants/Styles";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrentRegion } from "../redux/actions/locationActions";
import ApiUrls from "../constants/ApiUrls";
import { Platform } from "react-native";

// #region TYPES
type State = {
  address: string,
  addressPredictions: Object[],
  showPredictions: boolean
};

type Props = {
  setCurrentRegion: Location => void,
  style: Object,
  beforeOnPress: () => void
};
// #endregion

export class AutoFillMapSearch extends React.Component<Props, State> {
  textInput: ?TextInput;
  state: State = {
    address: "",
    addressPredictions: [],
    showPredictions: false
  };

  async setSamplePrediction() {
    await this.setState({ address: "88 n spring st 03301" });
    await this.handleAddressChange();
    this.onPredictionSelect(this.state.addressPredictions[0]);
  }

  async componentDidMount() {
    // setTimeout(this.setSamplePrediction.bind(this), 1000);
  }

  async handleAddressChange() {
    // SHOULD BE A REDUX ACTION
    try {
      const result = await fetch(ApiUrls.mapsSearch(this.state.address));
      const { predictions, error_message } = await result.json();
      if (error_message) throw new Error(error_message);
      this.setState({ addressPredictions: predictions });
    } catch (err) {
      console.warn(err);
    }
  }
  onChangeText = (address: string) => {
    this.setState(
      { address, showPredictions: true },
      _.debounce(this.handleAddressChange.bind(this), 800)
    );
  };

  async onPredictionSelect(prediction: Object) {
    this.textInput && this.textInput.blur();
    this.setState({ address: prediction.description, showPredictions: false });
    // SHOULD BE A REDUX ACTION
    try {
      const res = await fetch(ApiUrls.mapsDetails(prediction.place_id));
      const { error_message, result } = await res.json();
      if (error_message) throw new Error(error_message);
      const location = result.geometry.location;
      this.props.setCurrentRegion({
        latitude: location.lat,
        longitude: location.lng,
        accuracy: 0.1,
        showMarker: true
      });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const predictions = this.state.addressPredictions.map(prediction => (
      <TouchableOpacity
        style={styles.prediction}
        key={prediction.id}
        onPress={() => {
          this.props.beforeOnPress();
          this.onPredictionSelect(prediction);
        }}
      >
        <Text style={text.prediction}>{prediction.description}</Text>
      </TouchableOpacity>
    ));

    return (
      <View>
        <TextInput
          ref={ref => (this.textInput = ref)}
          onChangeText={this.onChangeText}
          value={this.state.address}
          style={[styles.input, this.props.style]}
          placeholder={"Search..."}
          placeholderTextColor={"grey"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          onBlur={() => {
            this.setState({ showPredictions: false });
          }}
        />
        {this.state.showPredictions && (
          <View style={styles.predictionsContainer}>{predictions}</View>
        )}
      </View>
    );
  }
}
export default connect(
  null,
  { setCurrentRegion }
)(AutoFillMapSearch);

const text = {
  prediction: {
    fontWeight: "100"
  }
};
const styles = {
  input: {
    fontFamily: AppStyles.font,
    fontSize: 16
  },
  prediction: {
    padding: 4,
    paddingTop: 10,
    margin: 3,
    borderTopColor: "lightgrey",
    borderTopWidth: 0.5
  },
  predictionsContainer: {
    borderTopWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -5
  }
};
