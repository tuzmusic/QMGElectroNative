// @flow
import type { Dispatch } from "redux";
import type { Saga } from "redux-saga";
import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import ApiUrls from "../../constants/ApiUrls";
import Station from "../../models/Station";
import User from "../../models/User";
import * as Types from "../StationTypes";

// #region Saga Actions
/** *
 * Saga Actions
 **/

export function getStationOwner(
  station: Station
): Types.GET_STATION_OWNER_START {
  return { type: "GET_STATION_OWNER_START", station };
}

export async function getStationOwnerApi(stationId: number): Promise<Object> {
  const url = ApiUrls.stationOwner(stationId);
  const { data } = await axios.get(url);
  return data;
}

export function* getStationOwnerSaga({
  station
}: Types.GET_STATION_OWNER_START): Saga<void> {
  let action: Types.UPDATE_LOCAL_STATION | Types.GET_STATION_OWNER_FAILURE;
  try {
    const userData = yield call(getStationOwnerApi, station.id);
    const user = User.fromStationOwnerResponse(userData);
    const updatedStation: Station = Object.assign(station, { user });
    action = { type: "UPDATE_LOCAL_STATION", station: updatedStation };
  } catch (error) {
    action = { type: "GET_STATION_OWNER_FAILURE", error: error.message };
    yield put(action);
  }
}

export async function getStationsApi(): Object {
  const { data } = await axios.get(ApiUrls.stationsIndex);
  return data;
}

export function* getStationsSaga(): Saga<void> {
  let action: Types.GET_STATIONS_SUCCESS | Types.GET_STATIONS_FAILURE;
  try {
    const data = yield call(getStationsApi);
    // debugger;
    const stations = Station.collectionFromObjects(data);
    action = { type: "GET_STATIONS_SUCCESS", stations };
    yield put(action);
  } catch (error) {
    action = { type: "GET_STATIONS_FAILURE", error: error.message };
    yield put(action);
  }
}

export default function* stationSaga(): Saga<void> {
  yield all([yield takeEvery("GET_STATIONS_START", getStationsSaga)]);
  yield all([yield takeEvery("GET_STATION_OWNER_START", getStationOwnerSaga)]);
}

// #region Thunk Actions
/** Thunk Actions
 *  **/
function results({
  stations,
  error
}: {
  stations: Station[],
  error: string
}): Types.GET_STATIONS_SUCCESS | Types.GET_STATIONS_FAILURE {
  if (stations) return { type: "GET_STATIONS_SUCCESS", stations };
  else return { type: "GET_STATIONS_FAILURE", error };
}

export function fetchStations() {
  return async (dispatch: Dispatch<Types.StationAction>) => {
    dispatch({ type: "GET_STATIONS_START" });
    // dispatch(results(await _downloadStations()));
    // dispatch({ type: "SAVE_STATIONS" });
  };
}

export async function _downloadStations(): Promise<Object> {
  const url = ApiUrls.stationsIndex;
  console.log("url:", url);

  try {
    const res = await axios(url);
    // debugger;
    const { data } = res;
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
    dispatch: Dispatch<Types.UPDATE_LOCAL_STATION | Types.SAVE_STATIONS>
  ) => {
    _getImageURLForStation(dispatch, station);
  };
}

/* private */ export async function _getImageURLForStation(
  dispatch: Dispatch<Types.UPDATE_LOCAL_STATION | Types.SAVE_STATIONS>,
  station: Station
) {
  if (station.mediaDataURL) {
    try {
      const { data } = await axios(station.mediaDataURL);
      const imageURL = data.media_details.sizes.medium.source_url;
      dispatch({
        type: "UPDATE_LOCAL_STATION",
        station: Object.assign(station, { imageURL })
      });
      dispatch({ type: "SAVE_STATIONS" });
    } catch (error) {
      console.warn(error);
    }
  }
}

export function setCurrentStationID(id: number) {
  return (dispatch: Dispatch<Types.SET_CURRENT_STATION>) => {
    dispatch({ type: "SET_CURRENT_STATION", stationID: id });
  };
}
// #endregion
