// @flow
import type { Dispatch } from "redux";
import type { Saga } from "redux-saga";
import type { Email } from "../StationTypes";
import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import ApiUrls from "../../constants/ApiUrls";
import Station from "../../models/Station";
import User from "../../models/User";
import * as Types from "../StationTypes";
import { MailGunApiKey } from "../../../secrets";

/* ACTION CREATORS */
export const getStations = (): Types.GET_STATIONS_START => ({
  type: "GET_STATIONS_START"
});

export const sendEmail = (email: Types.Email): Types.SEND_EMAIL_START => ({
  type: "SEND_EMAIL_START",
  email
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
export async function sendEmailApi(email: Email): Object {
  const DOMAIN = "sandbox67164cd0fd6549bbab983974f12133ba.mailgun.org";
  const data = {
    ...email,
    to: "tuzmusic@gmail.com"
  };
  const url = `https://api.mailgun.net/v3/${DOMAIN}/messages`;
  console.log("attempting to send email:", data, "url:", url);

  const res = await axios.post(
    url,
    {
      ...data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    {
      auth: {
        username: "api",
        password: MailGunApiKey
        // password: "7beb6df5d914d1d33682f8ee3c806c40-73ae490d-3103c3a6"
      }
    }
  );
  console.warn(res);
  debugger;
  return res;
}

export function* sendEmailSaga({ email }: Types.SEND_EMAIL_START): Saga<void> {
  try {
    const res = yield call(sendEmailApi, email);
    console.log(res);

    debugger;
  } catch (error) {
    console.warn("ERROR:", error);
    debugger;
  }
}

export default function* stationSaga(): Saga<void> {
  yield all([yield takeEvery("GET_STATIONS_START", getStationsSaga)]);
  yield all([yield takeEvery("SEND_EMAIL_START", sendEmailSaga)]);
}
