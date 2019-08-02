// @flow

export type Location = {
  latitude: number,
  longitude: number,
  latitudeDelta?: number,
  longitudeDelta?: number,
  accuracy?: number,
  showMarker?: boolean
};

export type LocationState = {
  +currentRegion: ?Location,
  +error: ?string,
  +searchRadiusInMiles: number
};

export type LocationAction =
  | USER_LOCATION_START
  | USER_LOCATION_SUCCESS
  | USER_LOCATION_FAILURE
  | SET_SEARCH_RADIUS
  | SET_CURRENT_REGION;

export type UserLocationResultAction =
  | USER_LOCATION_SUCCESS
  | USER_LOCATION_FAILURE;

export type USER_LOCATION_START = { type: "USER_LOCATION_START" };
export type USER_LOCATION_SUCCESS = {
  type: "USER_LOCATION_SUCCESS",
  region: Location
};
export type USER_LOCATION_FAILURE = {
  type: "USER_LOCATION_FAILURE",
  error: string
};
export type SET_SEARCH_RADIUS = { type: "SET_SEARCH_RADIUS", radius: number };
export type SET_CURRENT_REGION = {
  type: "SET_CURRENT_REGION",
  region: Location
};
