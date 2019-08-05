// @flow
import type { Dispatch } from "redux";
import type { Saga } from "redux-saga";
import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import ApiUrls from "../../constants/ApiUrls";
import Station from "../../models/Station";
import User from "../../models/User";
import * as Types from "../StationTypes";

/* ACTION CREATORS */
export const getStations = (): Types.GET_STATIONS_START => ({
  type: "GET_STATIONS_START"
});

/* SAGAS AND APIs */
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
}
