// @flow
import type { Location } from "../LocationTypes";
import * as StationTypes from "../StationTypes";
import Station from "../../models/Station";
import AsyncStorage from "@react-native-community/async-storage";

const initialState: StationTypes.StationState = {
  stations: {},
  currentStationID: null,
  isLoading: false,
  error: null
};

export default function mainReducer(
  state: StationTypes.StationState = initialState,
  action: StationTypes.StationAction
): StationTypes.StationState {
  // if (action.type.includes("STATION")) console.log(action.type);

  switch (action.type) {
    // #region GET STATIONS
    case "GET_STATIONS_START":
      return { ...state, isLoading: true };
    case "GET_STATIONS_SUCCESS":
      return {
        ...state,
        stations: { ...state.stations, ...action.stations },
        isLoading: state.stations === 0
      };
    case "GET_STATIONS_FAILURE":
      console.warn("Couldn't get stations:", action.error);
      return { ...state, error: action.error, isLoading: false };
    // #endregion
    // #region CREATE/UPDATE/DELETE STATIONS
    case "UPDATE_LOCAL_STATION":
      return {
        ...state,
        stations: { ...state.stations, [action.station.id]: action.station }
      };
    case "SET_CURRENT_STATION":
      return { ...state, currentStationID: action.stationID };
    case "SAVE_STATIONS":
      const data = { stations: state.stations, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      AsyncStorage.setItem("electro_stations", storageString);
      return state;
    // #endregion
    default:
      return state;
  }
}
