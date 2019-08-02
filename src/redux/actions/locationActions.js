// @flow
import Geolocation from "@react-native-community/geolocation";
import * as LocationTypes from "../LocationTypes";

import type { Saga } from "redux-saga";
import { call, put, select, takeEvery, all } from "redux-saga/effects";

export function setCurrentRegion(
  region: LocationTypes.Location
): LocationTypes.SET_CURRENT_REGION {
  return {
    type: "SET_CURRENT_REGION",
    region: { ...region, ...calculateRegion(region) }
  };
}

export function setSearchRadius(
  radius: number
): LocationTypes.SET_SEARCH_RADIUS {
  return { type: "SET_SEARCH_RADIUS", radius };
}

export function getLocation(): LocationTypes.USER_LOCATION_START {
  return { type: "USER_LOCATION_START" };
}

export function* getLocationSaga(): Saga<void> {
  let action: LocationTypes.UserLocationResultAction;
  try {
    const region = yield call(getUserLocation);
    action = { type: "USER_LOCATION_SUCCESS", region };
    yield put(action);
  } catch (error) {
    action = { type: "USER_LOCATION_FAILURE", error: error.message };
    yield put(action);
  }
}

function getCurrentPositionAsync(): Promise<Object> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve);
  });
}

async function getUserLocation(): Promise<LocationTypes.Location> {
  let location = await getCurrentPositionAsync();
  let { latitude, longitude } = location.coords;
  let region = { latitude, longitude, accuracy: 0.05 };
  return { ...region, ...calculateRegion(region) };
}

function calculateRegion({
  latitude,
  longitude,
  accuracy = 0.05
}): LocationTypes.Location {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  const region = { latitude, longitude, latitudeDelta, longitudeDelta };
  return { ...region, latitudeDelta: 0.03, longitudeDelta: 0.03 };
}

export default function* locationSaga(): Saga<void> {
  yield all([yield takeEvery("USER_LOCATION_START", getLocationSaga)]);
}
