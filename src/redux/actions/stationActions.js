import AsyncStorage from "@react-native-community/async-storage";
import Station from "../../models/Station";
import ApiUrls from "../../constants/ApiUrls";
import axios from "axios";

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

export async function _downloadStations() {
  const url = ApiUrls.stationsIndex;
  try {
    const { data } = await axios(url);
    const stations = Station.collectionFromArray(data);
    for (const id in stations) {
      const station = stations[Number(id)];
      if (!station.location && station.address) await station.setLocation();
    }
    return { stations };
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
