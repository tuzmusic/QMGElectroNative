// @flow
import type { Dispatch } from "redux";
import * as StationTypes from "../StationTypes";
import AsyncStorage from "@react-native-community/async-storage";
import Station from "../../models/Station";
import User from "../../models/User";
import ApiUrls from "../../constants/ApiUrls";
import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";

// #region Saga Actions
/** *
 * Saga Actions
 **/

export function getStationOwner(stationId: number) {}

// #region Thunk Actions
/** Thunk Actions
 *  **/
function results({
  stations,
  error
}: {
  stations: Station[],
  error: string
}): StationTypes.GET_STATIONS_SUCCESS | StationTypes.GET_STATIONS_FAILURE {
  if (stations) return { type: "GET_STATIONS_SUCCESS", stations };
  else return { type: "GET_STATIONS_FAILURE", error };
}

export function fetchStations() {
  return async (dispatch: Dispatch<StationTypes.StationAction>) => {
    dispatch({ type: "GET_STATIONS_START" });
    dispatch(results(await _downloadStations()));
    dispatch({ type: "SAVE_STATIONS" });
  };
}

export async function _downloadStations(): Promise<Object> {
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

/* public */ export function getImageURLForStation(station: Station) {
  return (
    dispatch: Dispatch<StationTypes.UPDATE_STATION | StationTypes.SAVE_STATIONS>
  ) => {
    _getImageURLForStation(dispatch, station);
  };
}

/* private */ export async function _getImageURLForStation(
  dispatch: Dispatch<StationTypes.UPDATE_STATION | StationTypes.SAVE_STATIONS>,
  station: Station
) {
  if (station.mediaDataURL) {
    try {
      const { data } = await axios(station.mediaDataURL);
      const imageURL = data.media_details.sizes.medium.source_url;
      dispatch({
        type: "UPDATE_STATION",
        station: Object.assign(station, { imageURL })
      });
      dispatch({ type: "SAVE_STATIONS" });
    } catch (error) {
      console.warn(error);
    }
  }
}

export function setCurrentStationID(id: number) {
  return (dispatch: Dispatch<StationTypes.SET_CURRENT_STATION>) => {
    dispatch({ type: "SET_CURRENT_STATION", stationID: id });
  };
}
// #endregion
