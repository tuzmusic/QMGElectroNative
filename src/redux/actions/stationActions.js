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
  // API actually does return an array, but Flow can't assume that, I guess.
  const { data } = await axios.get(ApiUrls.stationsIndex);
  return data;
}

export function* getStationsSaga(): Saga<void> {
  let action: Types.GET_STATIONS_SUCCESS | Types.GET_STATIONS_FAILURE;
  try {
    const objects = yield call(getStationsApi);
    const stations = Station.collectionFromObjects(objects);
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

export function getStations() {
  return { type: "GET_STATIONS_START" };
}

export function setCurrentStationID(id: number) {
  return { type: "SET_CURRENT_STATION", stationID: id };
}
// #endregion
