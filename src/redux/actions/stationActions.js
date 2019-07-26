import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

function results({ stations, error }) {
  return {
    type: "GET_STATIONS_" + (stations ? "SUCCESS" : "FAILURE"),
    stations,
    error
  };
}

export function fetchStations() {
  return async dispatch => {
    dispatch({ type: "GET_STATIONS_START" });
    dispatch(results(await _downloadStations()));
    dispatch({ type: "SAVE_STATIONS" });
  };
}

export async function _getCachedStations() {
  try {
    const data = await AsyncStorage.getItem("electro_stations");
    if (data === null) return console.warn("requested key returns null");
    const stations = JSON.parse(data).stations;
    Object.values(stations).forEach(
      json => (stations[json.id] = new Station(json))
    );
    return { stations };
  } catch (error) {
    return { error };
  }
}

import CupertinoStations from "../../../tests/__mocks__/CupertinoStations";
export async function _downloadStations() {
  const url = "http://joinelectro.com/wp-json/wp/v2/job-listings/";
  try {
    const res = await fetch(url);
    const json = await res.json();
    const stations = Object.assign(
      {},
      ...json.map(s => ({ [s.id]: Station.fromApi(s) }))
    );
    // debugger;
    for (const id in stations) {
      const station = stations[Number(id)];
      if (!station.location && station.address) await station.setLocation();
      // if (!station.location) debugger;
      // console.log(station.location);
    }
    return __DEV__
      ? { stations: { ...stations, ...CupertinoStations } }
      : { stations };
  } catch (error) {
    console.warn(error);
    return { error };
  }
}

/* public */ export function getImageURLForStation(station) {
  return dispatch => {
    _getImageURLForStation(dispatch, station);
  };
}

/* private */ export async function _getImageURLForStation(dispatch, station) {
  if ((url = station.mediaDataURL)) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const imageURL = json.media_details.sizes.medium.source_url;
      dispatch({
        type: "UPDATE_STATION",
        station: { ...station, imageURL }
      });
      dispatch({ type: "SAVE_STATIONS" });
    } catch (error) {
      console.warn(error);
    }
  }
}

export function setCurrentStationID(id) {
  return dispatch => {
    dispatch({ type: "SET_CURRENT_STATION", stationID: id });
  };
}
